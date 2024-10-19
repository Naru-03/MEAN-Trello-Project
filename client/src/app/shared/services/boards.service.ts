import { Observable } from 'rxjs';
import { getBoards } from '../../../../../server/src/controllers/boards';
import { BoardInterface } from '../types/board.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { Injectable } from '@angular/core';
import { SocketEventsEnum } from '../../../../../server/src/types/socketEvents.enum';
import { SocketService } from './socket.service';

@Injectable()
export class BoardsService {

    constructor(private http: HttpClient, private socketService: SocketService) { }

    getBoards(): Observable<BoardInterface[]> {
        const url = environment.apiUrl + '/boards';
        return this.http.get<BoardInterface[]>(url);
    }

    getBoard(boardId: string): Observable<BoardInterface> {
        const url = `${environment.apiUrl}/boards/${boardId}`;
        return this.http.get<BoardInterface>(url);
    }

    createBoard(title: string): Observable<BoardInterface> {
        const url = environment.apiUrl + '/boards';
        return this.http.post<BoardInterface>(url, { title });
    }

    updateBoard(boardId: string, fields: { title: string }): void {
        this.socketService.emit(SocketEventsEnum.boardsUpdate, { boardId, fields });
    }

    deleteBoard(boardId: string): void {
        this.socketService.emit(SocketEventsEnum.boardsDelete, { boardId });
    }
}