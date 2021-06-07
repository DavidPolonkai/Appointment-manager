import { Component, OnInit, Output } from '@angular/core';
import { Appointment } from 'src/model/Appointment';
import { AppointmentService } from 'src/service/appointment.service';

@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.css']
})
export class ListAppointmentsComponent implements OnInit {

  appointmentList: Appointment[] = [];
  constructor(private appointmentService:AppointmentService) { }

  async ngOnInit(): Promise<void> {
    this.appointmentList = await this.appointmentService.getAll();
  }

}
