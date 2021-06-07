import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/model/Appointment';
import { AuthService } from './auth.service';

const baseUrl = 'http://localhost:8080/api/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  async save(appointment: Appointment) {
    const url = baseUrl + "/create";
    appointment.userid = this.authService.loggedInUserId;
    console.log(appointment);
    const ret = this.http.post(baseUrl + "/create", appointment).toPromise();
    return ret;
  }

  async getAll() {
    const url = baseUrl + "/getByUser";
    const userid = this.authService.loggedInUserId;
    const ret = this.http.get<Appointment[]>(url+"/id="+userid).toPromise();
    return ret;
  }

  async deleteAppointment(appointment:Appointment) {
    const url = baseUrl + "/delete";
    const id = appointment._id;
    console.log(id);
    const ret = this.http.delete(url+"/id="+id).toPromise();
    return ret;
  }

  async updateAppointment(appointment: Appointment) {
    const url = baseUrl + "/update";
    const ret = this.http.put(url,appointment).toPromise();
    return ret;
  }

}
