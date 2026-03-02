import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RunsCard } from '../../shared/components/runs-card/runs-card';
import { AchievementsCard } from '../../shared/components/achievements-card/achievements-card';
import { Chart, registerables } from 'chart.js';
import { RunInterface } from '../../interfaces/run.interface';
import { AuthService } from '../../core/services/auth-service';
import { RunsService } from '../../core/services/runs-service';
import { Navbar } from '../../shared/components/navbar/navbar';

Chart.register(...registerables);

@Component({
  selector: 'app-profile',
  imports: [Navbar, RouterLink, RunsCard, AchievementsCard],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  user: { id: number; username: string; email: string } | null = null;
  @ViewChild('distanceChart') chartRef!: ElementRef<HTMLCanvasElement>;

  constructor(
    private authService: AuthService,
    private runService: RunsService,
    private cdr: ChangeDetectorRef,
  ) {}

  runs: RunInterface[] = [];
  stats: any = null;

  ngOnInit() {
    this.user = this.authService.getUser();

    this.runService.getRuns().subscribe((data: any) => {
      this.runs = data;
      if (this.runs.length > 0) {
        this.cdr.detectChanges();
        this.createChart();
      }
    });

    this.runService.getStats().subscribe((data: any) => {
      this.stats = {
        ...data,
        averageDistance: Math.round(data.averageDistance * 100) / 100,
      };
    });
  }

  createChart() {
    const sortedRuns = [...this.runs].sort(
      (a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime(),
    );
    const labels = sortedRuns.map((run) =>
      new Date(run.createdAt!).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    );
    const data = sortedRuns.map((run) => run.distance);

    new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Distance (km)',
            data,
            borderColor: '#a3e635',
            backgroundColor: 'rgba(163, 230, 53, 0.1)',
            fill: true,
            tension: 0.3,
            pointBackgroundColor: '#a3e635',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            ticks: { color: '#a1a1aa' },
            grid: { display: false },
          },
          y: {
            ticks: { color: '#a1a1aa' },
            grid: { color: '#27272a' },
          },
        },
      },
    });
  }
}
