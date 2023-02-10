import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { User } from '../model/User';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user: User = JSON.parse(localStorage.getItem('currentUser') as string);
    console.log('user: ',user);
    if(user) {
      return true;
    }else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}