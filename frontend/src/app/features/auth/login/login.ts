import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertCard } from '../../../shared/components/alert-card/alert-card';
import { AuthService } from '../../../core/services/auth-service';
import { LoadingDots } from '../../../shared/components/loading-dots/loading-dots';

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

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  loginError = '';

  onSubmit() {
    this.loginError = '';

    if (!this.email) {
      this.loginError = 'Please enter your email address.';
      return;
    }
    if (!this.password) {
      this.loginError = 'Please enter your password.';
      return;
    }

    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        this.authService.saveToken(response.access_token);
        this.authService.saveUser(response.user);
        this.router.navigate(['/profile']);
      },
      error: () => {
        this.isLoading = false;
        this.loginError = 'Invalid email or password.';
      },
    });
  }
}
