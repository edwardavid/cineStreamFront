import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Series } from '../interfaces/series';


@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private url = 'http://localhost:4040/api/series'; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const user = this.authService.getUser();
    const token = user ? user.token : null;
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<Series[]> {
    return this.http.get<Series[]>(this.url, { headers: this.getAuthHeaders() });
  }

  getById(id: string): Observable<Series> {
    return this.http.get<Series>(`${this.url}/${id}`, { headers: this.getAuthHeaders() });
  }

  addSeries(series: Series): Observable<Series> {
    return this.http.post<Series>(this.url, series, { headers: this.getAuthHeaders() });
  }

  updateSeries(id: string, series: Series): Observable<any> {
    return this.http.patch(`${this.url}/${id}`, series, { headers: this.getAuthHeaders() });
  }

}