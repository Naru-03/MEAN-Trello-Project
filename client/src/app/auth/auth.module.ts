import { NgModule } from "@angular/core";
import { AuthService } from "./services/auth.service";
import path from "path";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "./services/authguard.service";

@NgModule({
    imports: [],
    providers: [AuthService, AuthGuardService],
    declarations: []
})

export class AuthModule {

}