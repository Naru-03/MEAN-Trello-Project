import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthIntercepter } from '../../auth/services/authintercepter.service';
import { AuthGuardService } from '../../auth/services/authguard.service';
import { BoardsService } from '../../shared/services/boards.service';
import board from '../../../../../server/src/models/board';
import { BoardInterface } from '../../shared/types/board.interface';
import { TopbarModule } from '../../shared/modules/topbar/topbar.module';
import { InlineFormModule } from "../../shared/modules/inlineForm/inlineForm.module";

@Component({
    selector: 'boards',
    standalone: true,
    imports: [CommonModule, HttpClientModule, TopbarModule, InlineFormModule, RouterOutlet, RouterModule],
    providers: [BoardsService, AuthService, { provide: HTTP_INTERCEPTORS, useValue: AuthIntercepter, multi: true }],
    templateUrl: './boards.component.html',
    styleUrl: './boards.component.scss'
})
export class BoardsComponent implements OnInit {
    boards: BoardInterface[] = [];
    constructor(private boardsService: BoardsService) { }

    ngOnInit(): void {
        this.boardsService.getBoards().subscribe((boards) => {
            this.boards = boards;
        });
    }

    createBoard(title: string): void {
        this.boardsService.createBoard(title).subscribe((createdBoard) => {
            this.boards = [...this.boards, createdBoard];
        });
    }


}
