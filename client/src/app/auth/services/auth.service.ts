import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CurrentUserInterface } from "../types/cureentUser.interface";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environment";
import { currentUser } from '../../../../../server/src/controllers/users';

@Injectable()

export class AuthService {
    currentUser$ = new BehaviorSubject<CurrentUserInterface | null | undefined>(undefined);
    constructor(private http: HttpClient) {

    }

    getCurrentUser(): Observable<CurrentUserInterface> {
        const url = environment.apiUrl + '/user';

        return this.http.get<CurrentUserInterface>(url);
    }

    setCurrentUser(currentUser: CurrentUserInterface | null): void {
        this.currentUser$.next(currentUser);
    }
}