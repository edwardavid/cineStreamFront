import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MyInfoService {
  private url = 'http://localhost:4040/api/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserInfo(): Observable<User> {
    const userId = this.authService.user?.id;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
    console.log('Fetching user info for ID:', userId);
    return this.http.get<User>(`${this.url}/my-info/${userId}`, { headers });
  }

  updateUserInfo(userData: any): Observable<User> {
    const userId = this.authService.user?.id;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
    return this.http.patch<User>(`${this.url}/update/${userId}`, userData, { headers });
  }

  deleteUser(): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
    return this.http.delete<void>(`${this.url}/${this.authService.user?.id}`, { headers });
  }

  updateUserPassword(userId: string, newPassword: string): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
    return this.http.patch<void>(`${this.url}/update-password/${userId}`, { password: newPassword }, { headers });
  }
}