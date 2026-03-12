import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertCard } from '../../../shared/components/alert-card/alert-card';
import { AuthService } from '../../../core/services/auth-service';
import { LoadingDots } from '../../../shared/components/loading-dots/loading-dots';

interface FieldErrors {
  email?: string;
  password?: string;
}

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, AlertCard, LoadingDots],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  isLoading = false;

  // Form data
  email = '';
  password = '';

  // Error handling
  loginError = '';
  fieldErrors: FieldErrors = {};

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  private clearErrors(): void {
    this.loginError = '';
    this.fieldErrors = {};
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validateForm(): boolean {
    this.clearErrors();
    let isValid = true;

    if (!this.email) {
      this.fieldErrors.email = 'Email is required';
      isValid = false;
    } else if (!this.isValidEmail(this.email)) {
      this.fieldErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!this.password) {
      this.fieldErrors.password = 'Password is required';
      isValid = false;
    }

    return isValid;
  }

  private parseBackendError(error: HttpErrorResponse): string {
    if (error.status === 401) {
      return 'Invalid email or password. Please try again.';
    }

    if (error.status === 0) {
      return 'Unable to connect to server. Please check your internet connection.';
    }

    if (error.status === 429) {
      return 'Too many login attempts. Please try again later.';
    }

    return 'Login failed. Please try again later.';
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.clearErrors();

    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        this.authService.saveToken(response.access_token);
        this.authService.saveUser(response.user);
        this.router.navigate(['/profile']);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.loginError = this.parseBackendError(err);
      },
    });
  }
}
