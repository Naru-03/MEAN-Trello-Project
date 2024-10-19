import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, Observable } from "rxjs";
import { Injectable } from "@angular/core";
@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }
    canActivate(): Observable<boolean> {
        return this.authService.isLogged$.pipe(map((isLoggedIn) => {
            if (!isLoggedIn) {
                return true;
            }
            this.router.navigate(['/']);
            return false;
        }))
    }

}