import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './user/register-user/register-user.component';
import { LoginUserComponent } from './user/login-user/login-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListAppointmentsComponent } from './appointments/list-appointments/list-appointments.component';
import { AppointmentEntityComponent } from './appointments/list-appointments/appointment-entity/appointment-entity.component';
import { AppointmentFormComponent } from './appointments/appointment-form/appointment-form.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '../guard/auth.guard';
import { UserService } from '../service/user.service';
import { AppointmentService } from '../service/appointment.service';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LoginUserComponent,
    ListAppointmentsComponent,
    AppointmentEntityComponent,
    AppointmentFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['localhost:8080/api/auth']
      }
    })
  ],
  providers: [
    AppointmentService,
    UserService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
