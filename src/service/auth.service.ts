import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from 'src/model/LoginUser';
import { map } from 'rxjs/operators';
import * as moment from "moment";
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

const TOKEN_NAME = 'access_token';
const TIMEOUT_NAME = TOKEN_NAME + '_timeout';
const baseUrl = 'http://localhost:8080/api/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private http: HttpClient, private router:Router) { }

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
        const expiresAt = moment().add(result.timeout, 's');
        console.log(result);
        //console.log(result.token);
        localStorage.setItem(TOKEN_NAME, result.token);
        localStorage.setItem(TIMEOUT_NAME, JSON.stringify(expiresAt.valueOf()));
        this.router.navigate(['listAppointments']);
        return true;
      })
    );
    return returned.toPromise();
  }

  logout() {
    console.log("Logging out..");
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(TIMEOUT_NAME);
    this.router.navigate(['login']);
  }

  private isTimeOutedAndAutoLogout():boolean {
    const timeout = JSON.parse(localStorage.getItem(TIMEOUT_NAME));
    const isTimeExpired = moment().diff(timeout)>0;
    if (isTimeExpired) {
      this.logout()
    }
    return isTimeExpired;
  }


  public get loggedIn(): boolean {
    console.log(this.getToken() !== null);
    console.log(!this.isTimeOutedAndAutoLogout());
    return (this.getToken() !== null)&&(!this.isTimeOutedAndAutoLogout());
  }

  public getloggedInUserName(){
    this.isTimeOutedAndAutoLogout();
    if (this.loggedIn) {
      return this.parseJwt(this.getToken()).userName;
    }
    return null;
  }
}

