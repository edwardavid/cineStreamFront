import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User|null = null
  url: string = "http://localhost:4040/api/users"
  
  
  constructor(private http : HttpClient, private cookieService: CookieService) {
    // rescatar usuario de las cookies
    if(cookieService.check('user')){
      this.user = JSON.parse(cookieService.get('user')) 
    }
  }
  
  // console.log(user);
  signup(name: string, email: string, pwd: string){
    return this.http.post(
      `${this.url}/register`,
      {
        name: name, 
        email: email,
        password: pwd
      }
    )
  }

  login(email: string, pass: string){
    return this.http.post(`${this.url}/login`,
    {
      email: email,
      password: pass,
    })
  }

  saveUser(user: User){
    this.user = user
    this.cookieService.set("user", JSON.stringify(user))
  }

  deleteUser(){
    this.user = null
    this.cookieService.delete("user")
    window.location.reload(); // Recargar la página
  }

  isUserAdmin(): boolean {
    return this.user?.role === 'admin';
  }

  getUser(): User | null {
    if (this.user === null && this.cookieService.check('user')) {
      this.user = JSON.parse(this.cookieService.get('user'));
    }
    return this.user;
  }
}