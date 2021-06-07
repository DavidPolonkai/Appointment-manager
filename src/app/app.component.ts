import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService:AuthService) {
  }
  ngOnInit(): void {
    this.logout();
  }
  title = 'Appointment-manager';
  
  logout() {
    this.authService.logout();
  }

}
