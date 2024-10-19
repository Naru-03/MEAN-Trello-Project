import { Observable } from 'rxjs';
import { getBoards } from '../../../../../server/src/controllers/boards';
import { BoardInterface } from '../types/board.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { Injectable } from '@angular/core';

@Injectable()
export class BoardsService {

    constructor(private http: HttpClient) {

    }
    getBoards(): Observable<BoardInterface[]> {
        const url = environment.apiUrl + '/boards';
        return this.http.get<BoardInterface[]>(url);

    }
}