import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth-service';
import { AlertCard } from '../../../shared/components/alert-card/alert-card';
import { LoadingDots } from '../../../shared/components/loading-dots/loading-dots';

interface FieldErrors {
  password?: string;
  confirmPassword?: string;
}

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, AlertCard, LoadingDots],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {
  token = '';
  password = '';
  confirmPassword = '';
  submitted = false;
  error = '';
  fieldErrors: FieldErrors = {};
  isLoading = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'] || '';
    if (!this.token) {
      this.error = 'Invalid or missing reset token. Please request a new password reset link.';
    }
  }

  private validateForm(): boolean {
    this.fieldErrors = {};
    let isValid = true;

    if (!this.password) {
      this.fieldErrors.password = 'Password is required';
      isValid = false;
    } else if (this.password.length < 6) {
      this.fieldErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!this.confirmPassword) {
      this.fieldErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (this.password !== this.confirmPassword) {
      this.fieldErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    return isValid;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.error = '';

    this.authService.resetPassword(this.token, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.submitted = true;
        this.error = '';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        if (err.status === 401) {
          this.error = 'This reset link has expired or is invalid. Please request a new one.';
        } else if (err.status === 0) {
          this.error = 'Unable to connect to server. Please check your internet connection.';
        } else {
          this.error = 'Failed to reset password. Please try again.';
        }
      },
    });
  }
}
