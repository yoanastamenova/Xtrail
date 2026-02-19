import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserGoal } from '../interfaces/user.interface';
import { AuthService } from '../service/auth-service';
@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if(this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    const birthDate = new Date(+this.year, +this.month - 1, +this.day);
    const age = Math.floor((Date.now() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000))

    const formData = {
      email: this.email,
      username: this.username,
      password: this.password,
      age: age,
      weight: this.weight,
      height: this.height,
      goal: this.goal
    }

    this.authService.register(formData).subscribe({
    next: () => this.router.navigate(['/login']),
    error: (err) => console.error('Registration failed', err)
  });
  }
}
