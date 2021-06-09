import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from 'src/model/LoginUser';
import { map } from 'rxjs/operators';
import * as moment from "moment";

const TOKEN_NAME = 'access_token';
const TIMEOUT_NAME = TOKEN_NAME + '_timeout';
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
  
  async login(user: LoginUser){
    const returned = this.http.post<{ token: string, timeout: string }>(baseUrl+'auth', user)
      .pipe(map(result => {
        const expiresAt = moment().add(result.timeout, 'second');
        console.log(result.token);
        localStorage.setItem(TOKEN_NAME, result.token);
        localStorage.setItem(TIMEOUT_NAME, JSON.stringify(expiresAt.valueOf()));
        return true;
      })
    );
    returned.toPromise();
    return returned;
  }

  logout() {
    console.log("Logging out..");
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(TIMEOUT_NAME);
  }

  private isTimeOutedAndAutoLogout():boolean {
    const timeout = JSON.parse(localStorage.getItem(TIMEOUT_NAME));
    const isTimeExpired = moment().isBefore(moment(timeout));
    if (isTimeExpired) {
      this.logout()
    }
    return isTimeExpired;
  }


  public get loggedIn(): boolean {
    return (this.getToken() !== null)&&(!this.isTimeOutedAndAutoLogout());
  }

  public get loggedInUserId(): string{
    this.isTimeOutedAndAutoLogout();
    return this.parseJwt(this.getToken()).userID;
  }

  public get loggedInUserName(): string{
    this.isTimeOutedAndAutoLogout();
    return this.parseJwt(this.getToken()).userName;
  }
}
