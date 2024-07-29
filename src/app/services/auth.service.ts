import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User | null = null;
  url: string = "http://localhost:4040/api/users";
  
  constructor(private http: HttpClient) {
    // Rescatar usuario de localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }
  
  signup(name: string, email: string, pwd: string) {
    return this.http.post(
      `${this.url}/register`,
      {
        name: name,
        email: email,
        password: pwd
      }
    );
  }

  login(email: string, pass: string) {
    return this.http.post(`${this.url}/login`, {
      email: email,
      password: pass,
    });
  }

  saveUser(user: User) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  }

  deleteUser() {
    this.user = null;
    localStorage.removeItem("user");
    window.location.reload(); // Recargar la página
  }

  isUserAdmin(): boolean {
    return this.user?.role === 'admin';
  }

  getUser(): User | null {
    if (this.user === null) {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    }
    return this.user;
  }
}
