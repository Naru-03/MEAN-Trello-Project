import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthIntercepter } from '../../services/authintercepter.service';

@Component({
  selector: 'app-registers',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [AuthService, { provide: HTTP_INTERCEPTORS, useValue: AuthIntercepter, multi: true }],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  protected form;
  error: string | null = null;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    console.log('register', this.form.value);
    this.authService.register(this.form.value as any).subscribe({
      next: (data) => {
        console.log('success', data);
        this.authService.setToken(data);
        this.authService.setCurrentUser(data);
        this.error = null;
        this.router.navigate(['/home']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('error', err.error);
        this.error = err.error.join(', ');
      }
    })

  }

  navigate() {
    this.router.navigate(['/login']);
  }
}
