import { UserInterface } from './../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  getMessage() {
    return this.http.get(`${this.apiUrl}`, { responseType: 'text' });
  }

  register(data: UserInterface) {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  saveUser(user: { id: number; username: string; email: string }){
    localStorage.setItem('user', JSON.stringify(user));
}
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): { id: number; username: string; email: string } | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
