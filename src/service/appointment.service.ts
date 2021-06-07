import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from 'src/model/Appointment';
import { AuthService } from './auth.service';

const baseUrl = 'http://localhost:8080/api/appointment/';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  async save(appointment: Appointment) {
    const url = baseUrl + "/create";
    appointment.userid = this.authService.loggedInUserId;
    const ret = this.http.post(baseUrl + "create", appointment).toPromise();
    return ret;
  }
}
