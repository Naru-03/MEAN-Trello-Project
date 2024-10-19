import { Component, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { BoardService } from '../../services/board.service';
import {
  combineLatest,
  filter,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TaskInterface } from '../../../shared/types/task.interface';
import { ColumnInterface } from '../../../shared/types/column.interface';
import { TasksService } from '../../../shared/services/tasks.service';
import { SocketService } from '../../../shared/services/socket.service';
import { SocketEventsEnum } from '../../../shared/types/socketEvents.enum';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TopbarModule } from '../../../shared/modules/topbar/topbar.module';
import { InlineFormModule } from '../../../shared/modules/inlineForm/inlineForm.module';

@Component({
  selector: 'task-modal',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TopbarModule, InlineFormModule, RouterOutlet, RouterModule, ReactiveFormsModule],
  templateUrl: './taskModal.component.html',
})
export class TaskModalComponent implements OnDestroy {
  @HostBinding('class') classes = 'task-modal';

  boardId: string;
  taskId: string;
  task$: Observable<TaskInterface>;
  data$: Observable<{ task: TaskInterface; columns: ColumnInterface[] }>;
  columnForm;
  unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardService: BoardService,
    private tasksService: TasksService,
    private socketService: SocketService,
    private fb: FormBuilder
  ) {
    this.columnForm = this.fb.group({
      columnId: [''],
    });
    const taskId = this.route.snapshot.paramMap.get('taskId');
    const boardId = this.route.parent?.snapshot.paramMap.get('boardId');

    if (!boardId) {
      throw new Error("Can't get boardID from URL");
    }

    if (!taskId) {
      throw new Error("Can't get taskID from URL");
    }

    this.taskId = taskId;
    this.boardId = boardId;
    this.task$ = this.boardService.tasks$.pipe(
      map((tasks) => {
        return tasks.find((task) => task.id === this.taskId);
      }),
      filter(Boolean)
    );
    this.data$ = combineLatest([this.task$, this.boardService.columns$]).pipe(
      map(([task, columns]) => ({
        task,
        columns,
      }))
    );

    this.task$.pipe(takeUntil(this.unsubscribe$)).subscribe((task) => {
      this.columnForm.patchValue({ columnId: task.columnId });
    });

    combineLatest([this.task$, this.columnForm.get('columnId')!.valueChanges])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([task, columnId]) => {
        if (task.columnId !== columnId) {
          this.tasksService.updateTask(this.boardId, task.id, { columnId });
        }
      });

    this.socketService
      .listen<string>(SocketEventsEnum.tasksDeleteSuccess)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.goToBoard();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  goToBoard(): void {
    this.router.navigate(['boards', this.boardId]);
  }

  updateTaskName(taskName: string): void {
    this.tasksService.updateTask(this.boardId, this.taskId, {
      title: taskName,
    });
  }

  updateTaskDescription(taskDesctiption: string): void {
    this.tasksService.updateTask(this.boardId, this.taskId, {
      description: taskDesctiption,
    });
  }

  deleteTask() {
    this.tasksService.deleteTask(this.boardId, this.taskId);
  }
}
