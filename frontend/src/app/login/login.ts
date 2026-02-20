import { Component } from '@angular/core';
import { AuthService } from '../service/auth-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
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

  onSubmit() {
    const email = this.email;
    const password = this.password;

    this.authService.login(email, password).subscribe({
      next: (response: any) => {
        this.authService.saveToken(response.access_token);
        this.router.navigate(['/profile']);
      },
      error: (err) => console.log('Login failed', err)
    })
  }
}
