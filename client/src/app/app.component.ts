import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/services/auth.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthIntercepter } from './auth/services/authintercepter.service';
import { AuthGuardService } from './auth/services/authguard.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthModule, HttpClientModule],
  providers: [AuthGuardService, { provide: HTTP_INTERCEPTORS, useValue: AuthIntercepter, multi: true }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'eltrello';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((data) => {
      console.log('res' + data);
      this.authService.setCurrentUser(data);
    }, (err) => {
      this.authService.setCurrentUser(null)
    })

    this.authService.isLogged$.subscribe((data) => {
      console.log('user is logged in', data);
    })
  }
}
