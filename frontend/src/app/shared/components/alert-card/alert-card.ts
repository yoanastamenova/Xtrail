import { Component, Input } from '@angular/core';

export type AlertType = 'error' | 'warning';

@Component({
  selector: 'app-alert-card',
  imports: [],
  templateUrl: './alert-card.html',
})
export class AlertCard {
  @Input() type: AlertType = 'error';
  @Input() title: string = '';
  @Input() message: string = '';
}
