import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Achievement, UserAchievement } from "../../interfaces/achievements.interface";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AchievementsService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllAchievements(): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(`${this.apiUrl}/achievements/all`);
  }

  getUserAchievements(): Observable<UserAchievement[]> {
    return this.http.get<UserAchievement[]>(`${this.apiUrl}/achievements/user`)
  }

  getAchievById(id: number): Observable<UserAchievement> {
    return this.http.get<UserAchievement>(`${this.apiUrl}/achievements/${id}`)
  }

  deleteAchievById(id: number) {
    return this.http.delete(`${this.apiUrl}/achievements/${id}`)
  }
}
