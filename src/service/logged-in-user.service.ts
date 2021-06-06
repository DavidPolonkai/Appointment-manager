import { Injectable } from '@angular/core';
import { emit } from 'process';
import { LoginUser } from 'src/model/LoginUser';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {
  private loginUser: LoginUser = null;

  constructor() { }

  setLoggedInUser(loginUser: LoginUser) {
    this.loginUser = loginUser;
  }

  logout() {
    this.loginUser = null;
  }

  getName() {
      return this.loginUser?.name;
  }

  getId() {
    return this.loginUser?._id
  }
}
