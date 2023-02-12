import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { NgxCaptchaModule } from 'ngx-captcha/public_api';
import { ReCaptcha2Component } from 'ngx-captcha/lib/components/recaptcha-2.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('captchaElem') captchaElem:ReCaptcha2Component;
  @ViewChild('langInput') langInput = ElementRef;

  public siteKey = "6Lf0aHQkAAAAAC_1rcmlZIiRXT3MOBk-RR9UJ4Go";
  public captchaIsLoaded = false;
  public captchaIsSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;

  public theme: 'light' | 'dark' = 'light';
  public size : 'normal' | 'compact' = 'normal';
  public lang = 'en';
  public type: 'image' | 'audio' = 'image';

  constructor(
    readonly userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  //SITE_KEY   = "6Lf0aHQkAAAAAC_1rcmlZIiRXT3MOBk-RR9UJ4Go";
  //SECRET_KEY = ".6Lf0aHQkAAAAACwIyOWYwqDXqj3HWfjePJOYU60b";
  
  
  userFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    recaptcha: ['']
  });

  ngOnInit(): void {
    
  }

  handleReset() : void {
    this.captchaElem.resetCaptcha();
  }

  handleSuccess(data:any) {
    console.log(data);
  }

  login(): void {
    if (
      this.userFormGroup.controls.email.value &&
      this.userFormGroup.controls.password.value &&
      this.userFormGroup.valid
    ) {
     
      this.userService.SignIn(
        this.userFormGroup.controls.email.value!,
        this.userFormGroup.controls.password.value!
      )
    }
    if(this.userService.loginAttempts == 3) {
      this.userFormGroup.controls.recaptcha.addValidators(Validators.required);
      this.userService.loginAttempts = 0;
    }
  }
}
