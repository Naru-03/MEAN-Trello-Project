import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthIntercepter } from '../auth/services/authintercepter.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [AuthService, { provide: HTTP_INTERCEPTORS, useValue: AuthIntercepter, multi: true }],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isLoggedInSubscription: Subscription | undefined;
  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    this.isLoggedInSubscription = this.authService.isLogged$.subscribe(auth => {
      if (auth) {
        this.router.navigate(['/boards']);
      } else {
        this.router.navigate(['/home']);
      }
    })
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  ngOnDestroy() {
    this.isLoggedInSubscription?.unsubscribe();
  }
}
