import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { LoginUser } from 'src/model/LoginUser';
import { User } from 'src/model/User';
import { AuthService } from 'src/service/auth.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: ['email@email.com', [Validators.required, Validators.email]],
    password: ['asdasdasd',[Validators.required]]
  })


  loginStatus = false;

  constructor(private authService:AuthService,private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  async login() {
    const requestedUser: LoginUser = this.loginForm.value;
    //requestedUser.password = crypto.hash(user.password,10);
    this.authService.login(requestedUser);
    //if (this.loginStatus) this.router.navigate(["/listappointments"]);
    console.log(localStorage.getItem('access_token'));
  }

}