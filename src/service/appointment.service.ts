import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from 'src/model/Appointment';

const baseUrl = 'http://localhost:8080/api/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient) { }

  async save(appointment: Appointment) {
    const url = baseUrl + "/create";
    return await this.http.post(url, appointment);
  }
}
