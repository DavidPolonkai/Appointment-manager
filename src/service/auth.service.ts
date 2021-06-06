import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from 'src/model/LoginUser';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  }

  private getToken() {
    return localStorage.getItem('access_token');
  }
  
  login(user:LoginUser): Observable<boolean>{
    return this.http.post<{ token: string }>('api/auth', user)
      .pipe(map(result => {
        localStorage.setItem('access_token', result.token);
        return true;
      })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  public get loggedInUserId(): string{
    return this.parseJwt(this.getToken()).userID;
  }

  public get loggedInUserName(): string{
    return this.parseJwt(this.getToken()).userName;
  }
}
