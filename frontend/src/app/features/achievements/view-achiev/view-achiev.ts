import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { AchievementsService } from '../../../core/services/achiev-service';
import { Achievement, UserAchievement } from '../../../interfaces/achievements.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-achiev',
  imports: [Navbar, DatePipe],
  templateUrl: './view-achiev.html',
  styleUrl: './view-achiev.css',
})
export class ViewAchiev implements OnInit {
  allAchievements: Achievement[] = [];
  userAchievements: UserAchievement[] = [];
  constructor(
    private achievmentsService: AchievementsService
  ) {}

  ngOnInit() {
    this.achievmentsService.getAllAchievements().subscribe({
      next: (data) => {
        this.allAchievements = data;
      },
      error: (err) => {
        console.error('Failed to load achievements:', err);
      }
    })

    this.achievmentsService.getUserAchievements().subscribe({
      next: (data) => {
        this.userAchievements = data;
      }
    })
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  get sortedAchievements(): Achievement[] {
    return [...this.allAchievements].sort((a, b) => {
      const aEarned = this.isEarned(a);
      const bEarned = this.isEarned(b);
      if (aEarned && !bEarned) return -1;
      if (!aEarned && bEarned) return 1;
      return 0;
    });
  }

  isEarned(achievement: Achievement): boolean {
    return this.userAchievements.some(ua => ua.achievement.id === achievement.id);
  }

  getEarnedDate(achievement: Achievement): Date | null {
    const ua = this.userAchievements.find(ua => ua.achievement.id === achievement.id);
    return ua ? ua.createdAt : null;
  }

  onDelete(achievement: UserAchievement) {
    this.achievmentsService.deleteAchievById(achievement.id).subscribe({
      next: () => {
        this.userAchievements = this.userAchievements.filter((i) => i.id !== achievement.id);
      },
      error: (err) => {
        console.error('Failed to delete achievement:', err);
      },
    });
  }
}
