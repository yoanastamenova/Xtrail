import { Component, OnInit } from '@angular/core';
import { RunsService } from '../../../core/services/runs-service';
import { RunInterface } from '../../../interfaces/run.interface';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-all-runs',
  imports: [Navbar],
  templateUrl: './all-runs.html',
  styleUrl: './all-runs.css',
})
export class AllRuns implements OnInit {
  runs: RunInterface[] = [];

  constructor(private runService: RunsService) {}

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
}
