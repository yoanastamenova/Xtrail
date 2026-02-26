import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink, FormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  email = '';
  submitted = false;
  error = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.forgotPassword(this.email).subscribe({
      next: () => {
        this.submitted = true;
        this.error = '';
      },
      error: () => {
        this.error = 'Something went wrong. Please try again.';
      },
    });
  }
}
