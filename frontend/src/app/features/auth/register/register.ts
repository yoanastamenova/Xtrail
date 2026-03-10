import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserGoal } from '../../../interfaces/user.interface';
import { AuthService } from '../../../core/services/auth-service';
import { LoadingDots } from '../../../shared/components/loading-dots/loading-dots';
import { AlertCard } from '../../../shared/components/alert-card/alert-card';

interface FieldErrors {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  birthDate?: string;
  weight?: string;
  height?: string;
}

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, LoadingDots, AlertCard],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  isLoading = false;

  // Form
  email = '';
  username = '';
  password = '';
  confirmPassword = '';
  day = '';
  month = '';
  year = '';
  weight: number = 0;
  height: number = 0;
  goal: UserGoal = UserGoal.HEALTHY;

  // Error handling
  formError = '';
  fieldErrors: FieldErrors = {};

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  private clearErrors(): void {
    this.formError = '';
    this.fieldErrors = {};
  }

  private validateForm(): boolean {
    this.clearErrors();
    let isValid = true;

    // Email validation
    if (!this.email) {
      this.fieldErrors.email = 'Email is required';
      isValid = false;
    } else if (!this.isValidEmail(this.email)) {
      this.fieldErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Username validation
    if (!this.username) {
      this.fieldErrors.username = 'Username is required';
      isValid = false;
    } else if (this.username.length < 3) {
      this.fieldErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    // Password validation
    if (!this.password) {
      this.fieldErrors.password = 'Password is required';
      isValid = false;
    } else if (this.password.length < 6) {
      this.fieldErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Confirm password validation
    if (!this.confirmPassword) {
      this.fieldErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (this.password !== this.confirmPassword) {
      this.fieldErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    // Birth date validation
    if (!this.day || !this.month || !this.year) {
      this.fieldErrors.birthDate = 'Please select your date of birth';
      isValid = false;
    }

    // Weight validation
    if (!this.weight || this.weight <= 0) {
      this.fieldErrors.weight = 'Please enter a valid weight';
      isValid = false;
    } else if (this.weight < 20 || this.weight > 300) {
      this.fieldErrors.weight = 'Weight must be between 20 and 300 kg';
      isValid = false;
    }

    // Height validation
    if (!this.height || this.height <= 0) {
      this.fieldErrors.height = 'Please enter a valid height';
      isValid = false;
    } else if (this.height < 100 || this.height > 250) {
      this.fieldErrors.height = 'Height must be between 100 and 250 cm';
      isValid = false;
    }

    return isValid;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private parseBackendError(error: HttpErrorResponse): string {
    if (error.status === 409) {
      // Conflict - email or username already exists
      const message = error.error?.message || '';
      if (message.toLowerCase().includes('email')) {
        this.fieldErrors.email = 'This email is already registered';
        return 'This email is already registered. Please use a different email or login.';
      }
      if (message.toLowerCase().includes('username')) {
        this.fieldErrors.username = 'This username is already taken';
        return 'This username is already taken. Please choose a different one.';
      }
      return 'Email or username already exists. Please try different values.';
    }

    if (error.status === 400) {
      // Validation error from backend
      const message = error.error?.message;
      if (Array.isArray(message)) {
        return message.join('. ');
      }
      return message || 'Please check your input and try again.';
    }

    if (error.status === 0) {
      return 'Unable to connect to server. Please check your internet connection.';
    }

    return 'Registration failed. Please try again later.';
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      this.formError = 'Please fix the errors below before submitting.';
      return;
    }

    const birthDate = new Date(+this.year, +this.month - 1, +this.day);
    const age = Math.floor((Date.now() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

    const formData = {
      email: this.email,
      username: this.username,
      password: this.password,
      age: age,
      weight: this.weight,
      height: this.height,
      goal: this.goal,
    };

    this.isLoading = true;
    this.clearErrors();

    this.authService.register(formData).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.formError = this.parseBackendError(err);
      },
    });
  }
}
