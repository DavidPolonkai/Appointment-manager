import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Appointment } from 'src/model/Appointment';
import { AppointmentService } from 'src/service/appointment.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    body: ['', [Validators.required]],
    date: [, [Validators.required]],
  })
  private id = null;
  isItEdit: boolean;

  constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isItEdit = this.id != null;
    if (this.isItEdit) {
      const appointment: Appointment = await this.appointmentService.getById(this.id);
      const format = 'yyyy-MM-dd';
      const locale = 'en-US';
      const formattedDate = formatDate(appointment.date, format, locale);
      this.appointmentForm.controls['title'].setValue(appointment.title);
      this.appointmentForm.controls['body'].setValue(appointment.body);
      this.appointmentForm.controls['date'].setValue(formattedDate);
    }
  }

  async save() {
    const appointment: Appointment = this.appointmentForm.value;
    await this.appointmentService.save(appointment);
  }

  async edit() {
    const appointment: Appointment = this.appointmentForm.value;
    console.log(appointment);
    await this.appointmentService.updateAppointment(appointment);
  }
}
