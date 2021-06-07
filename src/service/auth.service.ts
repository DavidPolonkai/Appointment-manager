import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from 'src/model/LoginUser';
import { map } from 'rxjs/operators';

const TOKEN_NAME = 'access_token';
const baseUrl = 'http://localhost:8080/api/';
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
    return localStorage.getItem(TOKEN_NAME);
  }
  
  login(user: LoginUser): Observable<boolean>{
    const returned = this.http.post<{ token: string }>(baseUrl+'auth', user)
      .pipe(map(result => {
        localStorage.setItem(TOKEN_NAME, result.token);
        return true;
      })
    );
    console.log(returned.toPromise());
    return returned;
  }

  logout() {
    localStorage.removeItem(TOKEN_NAME);
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem(TOKEN_NAME) !== null);
  }

  public get loggedInUserId(): string{
    return this.parseJwt(this.getToken()).userID;
  }

  public get loggedInUserName(): string{
    return this.parseJwt(this.getToken()).userName;
  }
}
