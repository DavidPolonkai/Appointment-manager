import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LoggedInUserService } from '../service/logged-in-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  name;
  constructor(private loggedInUserService: LoggedInUserService) {
    this.name = this.loggedInUserService.loginUser
  }
  title = 'Appointment-manager';

  getName() {
    return (this.name?.name != null ? this.name?.name : "");
  }
  
}
