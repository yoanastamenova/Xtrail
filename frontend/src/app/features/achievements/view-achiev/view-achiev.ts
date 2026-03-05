import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { AchievementsService } from '../../../core/services/achiev-service';
import { Achievement, UserAchievement } from '../../../interfaces/achievements.interface';

@Component({
  selector: 'app-view-achiev',
  imports: [Navbar],
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
