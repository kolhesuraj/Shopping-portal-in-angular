import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private route:Router){}
  canActivate(){
    if (localStorage.getItem('LoginUser')) {
    //  console.log(localStorage.getItem('LoginUser'));
      return true;
    }
      this.route.navigate(['seller/auth/login']);
      return false;
  }
  
}
