import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';
import * as bcrypt from 'bcrypt';

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


  loginStatus = true;

  constructor(private authService:AuthService,private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  async login() {
    const requestedUser = this.loginForm.value;
    requestedUser.password = bcrypt.hash(requestedUser.password,10);
    const ret = await this.authService.login(requestedUser);
    this.loginStatus = this.authService.loggedIn;
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}