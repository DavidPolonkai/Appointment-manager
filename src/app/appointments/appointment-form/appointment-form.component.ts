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
  appointment: Appointment;

  constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isItEdit = this.id != null;
    if (this.isItEdit) {
      this.appointment = await this.appointmentService.getById(this.id);
      const format = 'yyyy-MM-dd';
      const locale = 'en-US';
      const formattedDate = formatDate(this.appointment.date, format, locale);
      this.appointmentForm.controls['title'].setValue(this.appointment.title);
      this.appointmentForm.controls['body'].setValue(this.appointment.body);
      this.appointmentForm.controls['date'].setValue(formattedDate);
    }
  }

  async save() {
    const appointment: Appointment = this.appointmentForm.value;
    await this.appointmentService.save(appointment);
  }

  async edit() {
    const appointment: Appointment = this.appointmentForm.value;
    appointment._id = this.appointment._id;
    appointment.userid = this.appointment.userid;
    await this.appointmentService.updateAppointment(appointment);
  }
}
