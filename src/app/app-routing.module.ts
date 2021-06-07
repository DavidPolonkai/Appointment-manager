import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentFormComponent } from './appointments/appointment-form/appointment-form.component';
import { ListAppointmentsComponent } from './appointments/list-appointments/list-appointments.component';
import { LoginUserComponent } from './user/login-user/login-user.component';
import { RegisterUserComponent } from './user/register-user/register-user.component';
import { AuthGuard } from '../guard/auth.guard';

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
    canActivate: [AuthGuard]
  },
  {
    path: 'appointmentForm',
    component: AppointmentFormComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
