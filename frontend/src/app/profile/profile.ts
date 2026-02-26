import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { RunsCard } from '../shared/components/runs-card/runs-card';
import { AchievementsCard } from '../shared/components/achievements-card/achievements-card';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-profile',
  imports: [Navbar, RouterLink, RunsCard, AchievementsCard],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit, AfterViewInit {
  user: { id: number; username: string; email: string } | null = null;
  @ViewChild('distanceChart') chartRef!: ElementRef<HTMLCanvasElement>;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    // Example data - replace with real data from your runs API
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = [5.2, 0, 8.1, 3.5, 0, 12.4, 6.3];

    new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Distance (km)',
          data,
          backgroundColor: '#a3e635',
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            ticks: { color: '#a1a1aa' },
            grid: { display: false }
          },
          y: {
            ticks: { color: '#a1a1aa' },
            grid: { color: '#27272a' }
          }
        }
      }
    });
  }
}
