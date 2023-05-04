import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL ='http://127.0.0.1:8000'

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any>{
    const body = { username, password };
    return this.http.post<any> (`${this.BASE_URL}/login`, body);
  }

  signup(name:string, username:string, password:string): Observable<any>{
    const body ={
      name:name,
      username: username,
      password:password
    };
    return this.http.post<any>(`${this.BASE_URL}`,body);
  }

  setToken(token:string):void {
    localStorage.setItem('token',token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean {
    return !!this.getToken();
  }

  logout():void{
    localStorage.removeItem('token');
  }
}
// The login method sends a POST request to the /login endpoint of your API with the provided username and password.
// The setToken method stores the JWT token in the local storage.
// The getToken method retrieves the JWT token from the local storage.
// The isLoggedIn method checks if the user is logged in by verifying if a token exists in the local storage.
// The logout method removes the token from the local storage.