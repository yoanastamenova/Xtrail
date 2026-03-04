import { Component } from '@angular/core';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { UserGoal } from '../../../interfaces/user.interface';
import { AuthService } from '../../../core/services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [Navbar, FormsModule, RouterLink],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  //Form data:
  userData = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    day: '',
    month: '',
    year: '',
    weight: 0,
    height: 0,
    goal: UserGoal.HEALTHY,
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    if (this.userData.password && this.userData.password !== this.userData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    const formData: Record<string, any> = {};

    if (this.userData.email) formData['email'] = this.userData.email;
    if (this.userData.username) formData['username'] = this.userData.username;
    if (this.userData.password) formData['password'] = this.userData.password;
    if (this.userData.weight) formData['weight'] = this.userData.weight;
    if (this.userData.height) formData['height'] = this.userData.height;
    if (this.userData.goal !== UserGoal.HEALTHY) formData['goal'] = this.userData.goal;

    if (this.userData.day && this.userData.month && this.userData.year) {
      const birthDate = new Date(+this.userData.year, +this.userData.month - 1, +this.userData.day);
      formData['age'] = Math.floor((Date.now() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    }

    if (Object.keys(formData).length === 0) {
      console.error('No fields to update');
      return;
    }

    this.authService.updateUser(formData).subscribe({
      next: () => {
        // Update localStorage immediately
        const currentUser = this.authService.getUser();
        if (currentUser) {
          if (formData['username']) currentUser.username = formData['username'];
          if (formData['email']) currentUser.email = formData['email'];
          this.authService.saveUser(currentUser);
        }
        this.router.navigate(['/profile']);
      },
      error: (err) => console.error('Update failed:', err),
    });
  }
}
