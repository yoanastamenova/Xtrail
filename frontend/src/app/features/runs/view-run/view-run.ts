import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { RunsService } from '../../../core/services/runs-service';
import { RunInterface } from '../../../interfaces/run.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-view-run',
  imports: [Navbar, DatePipe, RouterLink],
  templateUrl: './view-run.html',
  styleUrl: './view-run.css',
})
export class ViewRun implements OnInit {
  constructor(
    private runService: RunsService,
    private route: ActivatedRoute,
  ) {}

  run: RunInterface | null = null;
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.runService.getRunById(id).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
      next: (data) => {
        this.run = data as RunInterface;
      },
      error: (err) => {
        console.error('Failed to load run:', err);
      },
    });
  }

  formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  formatPace(secondsPerKm: number): string {
    const mins = Math.floor(secondsPerKm / 60);
    const secs = secondsPerKm % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
