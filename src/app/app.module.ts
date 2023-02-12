import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import {environment, environmentRecaptcha} from '../environments/environment';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { RegistrationComponent } from './component/registration/registration.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './service/auth-guard.service';
import { TableComponent } from './component/table/table.component';
import { CreateBillComponent } from './component/create-bill/create-bill.component';
import { DatePipePipe } from './pipe/date-pipe.pipe';
import { BillDetailsComponent } from './component/bill-details/bill-details.component';
import {HttpClientModule} from '@angular/common/http';
import { NgxCaptchaModule } from 'ngx-captcha';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HomeComponent,
    LoginComponent,
    TableComponent,
    CreateBillComponent,
    DatePipePipe,
    BillDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxCaptchaModule,
    RecaptchaModule,
    RecaptchaFormsModule
    
  ],
  providers: [
    AuthGuardService,
    {
    provide:RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: environmentRecaptcha.recaptcha.siteKey
    } as RecaptchaSettings
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
