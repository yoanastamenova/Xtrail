import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth-service';
import { AlertCard } from '../../../shared/components/alert-card/alert-card';
import { LoadingDots } from '../../../shared/components/loading-dots/loading-dots';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink, FormsModule, AlertCard, LoadingDots],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  email = '';
  submitted = false;
  error = '';
  emailError = '';
  isLoading = false;

  constructor(private authService: AuthService) {}

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validateForm(): boolean {
    this.emailError = '';

    if (!this.email) {
      this.emailError = 'Email is required';
      return false;
    }

    if (!this.isValidEmail(this.email)) {
      this.emailError = 'Please enter a valid email address';
      return false;
    }

    return true;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.error = '';

    this.authService.forgotPassword(this.email).subscribe({
      next: () => {
        this.isLoading = false;
        this.submitted = true;
        this.error = '';
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        if (err.status === 0) {
          this.error = 'Unable to connect to server. Please check your internet connection.';
        } else {
          this.error = 'Something went wrong. Please try again.';
        }
      },
    });
  }
}
