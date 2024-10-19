import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
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
