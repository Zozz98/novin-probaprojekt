import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { RegistrationComponent as RegistrationComponent } from './component/registration/registration.component';
import { AuthGuardService } from './service/auth-guard.service';
import { CreateBillComponent } from './component/create-bill/create-bill.component';
import { TableComponent } from './component/table/table.component';

const routes: Routes = [
    {path: 'home',component: HomeComponent, canActivate:[AuthGuardService]},
    {path: 'registration',component: RegistrationComponent},
    {path: 'createBill', component: CreateBillComponent},
    {path: 'table', component: TableComponent},
    {path: '**', component: LoginComponent}
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
