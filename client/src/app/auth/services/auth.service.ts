import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CurrentUserInterface } from "../types/cureentUser.interface";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environment";
import { currentUser, register } from '../../../../../server/src/controllers/users';
import { RegisterRequestInterface } from "../types/registerRequest.interface";

@Injectable()

export class AuthService {
    currentUser$ = new BehaviorSubject<CurrentUserInterface | null | undefined>(undefined);
    constructor(private http: HttpClient) {

    }

    getCurrentUser(): Observable<CurrentUserInterface> {
        const url = environment.apiUrl + '/user';

        return this.http.get<CurrentUserInterface>(url);
    }

    register(registerRequest: RegisterRequestInterface): Observable<CurrentUserInterface> {
        const url = environment.apiUrl + '/users';
        return this.http.post<CurrentUserInterface>(url, registerRequest);
    }

    setToken(currentUser: CurrentUserInterface): void {
        localStorage.setItem('token', currentUser.token)
    }

    setCurrentUser(currentUser: CurrentUserInterface | null): void {
        this.currentUser$.next(currentUser);
    }
}