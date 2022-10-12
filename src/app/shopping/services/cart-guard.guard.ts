import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';


@Injectable({
  providedIn: 'root',
})
export class CartGuardGuard implements CanActivate {
  constructor(private route: Router, private toast : HotToastService) {}
  canActivate() {
    if (localStorage.getItem('token')) {
      return true;
    }
    this.route.navigate(['shop/auth']);
this.toast.error('Please Login For CheckOut')
    return false;
  }
}
