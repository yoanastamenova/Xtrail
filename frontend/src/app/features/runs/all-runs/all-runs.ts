import { Component } from '@angular/core';
import { RunsService } from '../../../core/services/runs-service';

@Component({
  selector: 'app-all-runs',
  imports: [],
  templateUrl: './all-runs.html',
  styleUrl: './all-runs.css',
})
export class AllRuns {
  constructor(private runService: RunsService) {}
}
