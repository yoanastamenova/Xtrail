import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-achievements-card',
  imports: [],
  templateUrl: './achievements-card.html',
})
export class AchievementsCard {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() icon: string = '🏆';
  @Input() unlocked: boolean = false;
}
