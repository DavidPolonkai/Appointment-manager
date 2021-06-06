import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/model/User';
import { LoginUser } from 'src/model/LoginUser';
import { LoggedInUserService } from './logged-in-user.service';


const baseUrl = 'http://localhost:8080/api/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private loggedInUserService: LoggedInUserService) { }

  async create(data) {
    const url = baseUrl + "/create";
    return this.http.post(url, data);
  }

}
