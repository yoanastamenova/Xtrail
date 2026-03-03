import { Component, OnInit } from '@angular/core';
import { RunsService } from '../../../core/services/runs-service';
import { RunInterface } from '../../../interfaces/run.interface';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-runs',
  imports: [Navbar, DatePipe],
  templateUrl: './all-runs.html',
  styleUrl: './all-runs.css',
})
export class AllRuns implements OnInit {
  runs: RunInterface[] = [];

  constructor(private runService: RunsService, private router: Router) {}

  ngOnInit() {
    this.runService.getRuns().subscribe({
      next: (data) => {
        this.runs = data;
      },
      error: (err) => {
        console.error('Failed to load runs:', err);
      },
    });
  }

  onDelete(run: RunInterface) {
    this.runService.deleteRunById(run.id!).subscribe({
      next: () => {
        this.runs = this.runs.filter((r) => r.id !== run.id);
      },
      error: (err) => {
        console.error('Failed to delete run:', err);
      },
    });
  }

  onInfo(run: RunInterface) {
    this.router.navigate([`/runs/${run.id}`]);
  }

  formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  formatPace(secondsPerKm: number): string {
    const mins = Math.floor(secondsPerKm / 60);
    const secs = secondsPerKm % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
