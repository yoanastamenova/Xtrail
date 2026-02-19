import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
})
export class Home {
  message = '';

  constructor(private api: ApiService) {
    this.api.getMessage().subscribe({
      next: (res) => (this.message = res),
      error: (err) => (this.message = 'Error fetching message'),
      complete: () => console.log('Fetch complete!'),
    });
  }
}
