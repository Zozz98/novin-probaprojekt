import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private readonly userService: UserService,
    private formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  user = this.formBuilder.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit(): void {}

   onRegistration(): void {
    if (this.user.valid) {
      if (
        this.user.controls.email.value != null &&
        this.user.controls.password.value != null &&
        this.user.controls.name.value != null
      ) {
        this.userService.SignUp(
          this.user.controls.email.value,
          this.user.controls.password.value,
          this.user.controls.name.value
          
        ).then(()=> {
          this.router.navigateByUrl('/');
          //console.log('wfwef');
        });
        
      }

      /*console.log(
        this.user.controls.email.value,
        this.user.controls.password.value
      );*/
    }
  }
}
