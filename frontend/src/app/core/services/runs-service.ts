import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RunInterface } from "../../interfaces/run.interface";

@Injectable({
  providedIn: 'root',
})
export class RunsService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  createRun(data: RunInterface){
    return this.http.post(`${this.apiUrl}/runs/new`, data);
  }

  getRuns(): Observable<RunInterface[]>{
    return this.http.get<RunInterface[]>(`${this.apiUrl}/runs/all`);
  }

  getStats(){
    return this.http.get(`${this.apiUrl}/runs/stats`);
  }

  getRunById(id: number){
    return this.http.get(`${this.apiUrl}/runs/${id}`);
  }

  deleteRunById(id: number){
    return this.http.delete(`${this.apiUrl}/runs/${id}`);
  }
}
