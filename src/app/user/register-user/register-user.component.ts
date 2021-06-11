import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service'
import * as bcrypt from 'bcrypt';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  regForm: FormGroup = this.formBuilder.group({
    email: ['email@email.com', [Validators.required, Validators.email]],
    address: ['address example 2',[Validators.required]],
    name: ['Hufnagel ',[Validators.required]],
    password: ['asdasdasd',[Validators.required,Validators.minLength(8)]]
  })

  constructor(private userservice: UserService,private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  async register() {
    const user = this.regForm.value;
    user.password = bcrypt.hash(user.password, 10);
    console.log(user);
    (await this.userservice.create(user)).subscribe(() =>
    this.router.navigate(["/login"]));
  }

}