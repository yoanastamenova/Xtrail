import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { RunsService } from '../../../core/services/runs-service';

type RunState = 'pre-run' | 'active' | 'summary';
@Component({
  selector: 'app-new-run',
  imports: [Navbar, FormsModule],
  templateUrl: './new-run.html',
  styleUrl: './new-run.css',
})
export class NewRun {
  constructor(
    private runService: RunsService,
    private router: Router,
  ) {}

  runData = {
    distance: 0,
    duration: 0,
    pace: 0,
    calories: 0,
    elevation: 0,
  };

  currentState: RunState = 'pre-run';

  // Timer
  elapsedSeconds = 0;
  isPaused = false;
  private timerInterval: ReturnType<typeof setInterval> | null = null;

  startRun() {
    this.currentState = 'active';
    this.startTimer();
  }

  stopRun() {
    this.stopTimer();
    this.runData.duration = this.elapsedSeconds;
    this.calculateStats();
    this.currentState = 'summary';
  }

  private calculateStats() {
    const distanceKm = this.runData.distance;
    const durationMinutes = this.runData.duration / 60;

    // Pace: minutes per km
    if (distanceKm > 0) {
      this.runData.pace = Math.round((durationMinutes / distanceKm) * 100) / 100;
    }

    // 60 kcal per km
    this.runData.calories = Math.round(distanceKm * 60);
  }

  pauseRun() {
    if (this.isPaused) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
    this.isPaused = !this.isPaused;
  }

  private startTimer() {
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds++;
    }, 1000);
  }

  private stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  formatTime(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  saveRun() {
    this.runService.createRun(this.runData).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.error('Failed to save run:', err);
      },
    });
  }
}
