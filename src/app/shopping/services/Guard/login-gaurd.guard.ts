import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginGaurdGuard implements CanActivate {
  constructor(private route: Router) {}
  canActivate() {
    if (!localStorage.getItem('token')) {
      //  console.log(localStorage.getItem('LoginUser'));
      return true;
    }
    this.route.navigate(['shop/products']);
    return false;
  }
}
