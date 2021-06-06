import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from 'src/model/Appointment';
import { AppointmentService } from 'src/service/appointment.service';
import { LoggedInUserService } from 'src/service/logged-in-user.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup = this.formBuilder.group({
    title: ['test', [Validators.required]],
    body: ['test body text',[Validators.required]],
    date: [,[Validators.required]],
  })
  constructor(private formBuilder: FormBuilder,private appointmentService:AppointmentService,private loggedInUserService:LoggedInUserService) { }

  ngOnInit(): void {
  }

  async save() {
    const appointment: Appointment = this.appointmentForm.value;
    appointment.userid = this.loggedInUserService.getId();
    console.log(appointment);
    if (appointment.userid != undefined) { 
     await this.appointmentService.save(appointment);
    }
  }

}
