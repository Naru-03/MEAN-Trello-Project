import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { AuthModule } from '../../auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthIntercepter } from '../../auth/services/authintercepter.service';
import { AuthGuardService } from '../../auth/services/authguard.service';
import { BoardsService } from '../../shared/services/boards.service';
import board from '../../../../../server/src/models/board';

@Component({
    selector: 'boards',
    standalone: true,
    imports: [CommonModule, HttpClientModule, AuthModule],
    providers: [BoardsService, { provide: HTTP_INTERCEPTORS, useValue: AuthIntercepter, multi: true }],
    templateUrl: './boards.component.html',
    styleUrl: './boards.component.scss'
})
export class BoardsComponent implements OnInit {
    constructor(private router: Router, private boardsService: BoardsService) {

    }

    ngOnInit() {
        this.boardsService.getBoards().subscribe(boards => {
            console.log(boards);

        })
    }


}
