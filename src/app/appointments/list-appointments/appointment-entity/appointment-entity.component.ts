import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/model/Appointment';
import { AppointmentService } from 'src/service/appointment.service';

const NEAR_DAY=1
const NEAR = NEAR_DAY * 24 * 60 * 60 * 1000;
@Component({
  selector: 'app-appointment-entity',
  templateUrl: './appointment-entity.component.html',
  styleUrls: ['./appointment-entity.component.css']
})
export class AppointmentEntityComponent implements OnInit {

  @Input()
  appointment: Appointment;
  show: boolean = true;


  constructor(private appointmentService:AppointmentService,private router: Router) { }

  ngOnInit(): void {
  }

  isItNear() {
    return new Date(this.appointment.date).getTime() - new Date().getTime()  < NEAR;
  }

  modify() {
    const navigationString = "editAppointment";
    const id = this.appointment._id;
    this.router.navigate(["editAppointment", { id: id }]);
  }

  delete() {
    this.appointmentService.deleteAppointment(this.appointment);
    this.show = false;
  }

}
