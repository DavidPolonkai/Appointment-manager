import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/service/can-deactivate-guard.service.spec';
import { AppointmentFormComponent } from './appointments/appointment-form/appointment-form.component';
import { ListAppointmentsComponent } from './appointments/list-appointments/list-appointments.component';
import { LoginUserComponent } from './user/login-user/login-user.component';
import { RegisterUserComponent } from './user/register-user/register-user.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterUserComponent
  },
  {
    path: 'login',
    component: LoginUserComponent
  },
  {
    path: 'appointments',
    component: ListAppointmentsComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'appointmentForm',
    component: AppointmentFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanDeactivateGuard]
})
export class AppRoutingModule { }
