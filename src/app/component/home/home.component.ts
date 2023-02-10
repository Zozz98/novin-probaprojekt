import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    userData?: User = JSON.parse(localStorage.getItem('currentUser') as string);
    
    
    constructor(private readonly userService: UserService, private readonly router: Router) { }

    ngOnInit(): void {
      
    }

    async signOut() {
       await this.userService.SignOut();
    }


}
