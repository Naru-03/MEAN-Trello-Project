import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './home/home.component';
import { BoardsComponent } from './boards/components/boards.component';
import { AuthGuardService } from './auth/services/authguard.service';
export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'boards',
        // canActivate: [AuthGuardService],
        component: BoardsComponent
    }
];
