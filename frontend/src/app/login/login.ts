import { Component } from '@angular/core';
import { AuthService } from '../service/auth-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertCard } from '../shared/components/alert-card/alert-card';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, AlertCard],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // Form data
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
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

    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        this.authService.saveToken(response.access_token);
        this.authService.saveUser(response.user);
        this.router.navigate(['/profile']);
      },
      error: () => {
        this.loginError = 'Invalid email or password.';
      }
    });
  }
}
