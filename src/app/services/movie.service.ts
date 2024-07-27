import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Movie } from '../interfaces/movie';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url = 'http://localhost:4040/api/movies';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const user = this.authService.getUser();
    const token = user ? user.token : null;
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url, { headers: this.getAuthHeaders() });
  }

  getById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.url}/${id}`, { headers: this.getAuthHeaders() });
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.url, movie, { headers: this.getAuthHeaders() });
  }

  updateMovie(id: string, movie: Movie): Observable<any> {
    return this.http.patch(`${this.url}/${id}`, movie, { headers: this.getAuthHeaders() });
  }

  deleteMovie(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.getAuthHeaders() });
  }
}