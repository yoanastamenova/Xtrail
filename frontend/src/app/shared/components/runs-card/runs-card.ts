import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-runs-card',
  imports: [],
  templateUrl: './runs-card.html',
})
export class RunsCard {
  @Input() label: string = '';
  @Input() value: string | number = '';
  @Input() unit: string = '';
}
