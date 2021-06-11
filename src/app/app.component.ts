import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnChanges{
  loggedInUserName;

  constructor(private authService:AuthService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    let change = changes['authService'];
    if (change.currentValue) {
      this.loggedInUserName = this.authService.loggedInUserName;
    }
    console.log(this.loggedInUserName);
  }
  ngOnInit(): void {
    this.logout();
  }
  title = 'Appointment-manager';
  
  logout() {
    this.authService.logout();
    this.loggedInUserName = '';
  }

}
