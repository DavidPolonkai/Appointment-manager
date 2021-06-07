import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from 'src/model/Appointment';
import { AppointmentService } from 'src/service/appointment.service';

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
  constructor(private formBuilder: FormBuilder,private appointmentService:AppointmentService) { }

  ngOnInit(): void {
  }

  async save() {
    const appointment: Appointment = this.appointmentForm.value;
    await this.appointmentService.save(appointment);
  }

}
