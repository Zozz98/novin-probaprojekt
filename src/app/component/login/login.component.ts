import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private readonly userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  

  userFormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    
  }

  login(): void {
    if (
      this.userFormGroup.controls.email.value &&
      this.userFormGroup.controls.password.value &&
      this.userFormGroup.valid
    ) {
      console.log(this.userFormGroup.controls.password.value);
      this.userService.SignIn(
        this.userFormGroup.controls.email.value!,
        this.userFormGroup.controls.password.value!
      );
    }
  }
}
