import { Component, OnInit } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { RunsCard } from '../shared/components/runs-card/runs-card';

@Component({
  selector: 'app-profile',
  imports: [Navbar, RouterLink, RunsCard],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  user: { id: number; username: string; email: string } | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getUser();
  }
}
