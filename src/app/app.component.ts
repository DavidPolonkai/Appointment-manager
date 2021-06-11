import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnChanges{
  loggedInUserName = this.authService.getloggedInUserName();

  constructor(private authService:AuthService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  ngOnInit(): void {
    this.logout();
  }
  title = 'Appointment-manager';
  
  logout() {
    this.authService.logout();
    this.loggedInUserName = '';
  }

  getLogin() {
    this.loggedInUserName = this.authService.getloggedInUserName();
  }

}
