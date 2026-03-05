import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AchievementsService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getAllAchievements() {
    return this.http.get(`${this.apiUrl}/achievements/all`);
  }

  getUserAchievements() {
    return this.http.get(`${this.apiUrl}/achievements/user`)
  }

  getAchievById(id: number) {
    return this.http.get(`${this.apiUrl}/achievements/${id}`)
  }

  deleteAchievById(id: number) {
    return this.http.delete(`${this.apiUrl}/achievements/${id}`)
  }
}
