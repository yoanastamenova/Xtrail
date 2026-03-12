import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserGoal, UserInterface } from '../../interfaces/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  register(data: UserInterface) {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  saveUser(user: { id: number; username: string; email: string }) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): { id: number; username: string; email: string } | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  updateUser(data: Partial<{ email: string; username: string; password: string; age: number; weight: number; height: number; goal: UserGoal }>) {
    return this.http.patch(`${this.apiUrl}/users/me`, data);
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, { email });
  }

  resetPassword(token: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/reset-password`, { token, password });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
