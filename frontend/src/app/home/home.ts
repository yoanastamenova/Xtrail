import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
})
export class Home {}
