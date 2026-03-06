import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RunsService } from '../../../core/services/runs-service';
import { RunInterface } from '../../../interfaces/run.interface';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingDots } from '../../../shared/components/loading-dots/loading-dots';

@Component({
  selector: 'app-all-runs',
  imports: [Navbar, DatePipe, LoadingDots],
  templateUrl: './all-runs.html',
  styleUrl: './all-runs.css',
})
export class AllRuns implements OnInit {
  private destroyRef = inject(DestroyRef);
  runs: RunInterface[] = [];

  constructor(
    private runService: RunsService,
    private router: Router,
  ) {}

  isLoading = false;

  ngOnInit() {
    this.isLoading = true;

    this.runService
      .getRuns()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.runs = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Failed to load runs:', err);
        },
      });
  }

  onDelete(run: RunInterface) {
    this.isLoading = true;

    this.runService
      .deleteRunById(run.id!)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.runs = this.runs.filter((r) => r.id !== run.id);
        },
        error: (err) => {
          this.isLoading = false;
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
