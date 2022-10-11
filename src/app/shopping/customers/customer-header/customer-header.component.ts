import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css'],
})
export class CustomerHeaderComponent implements OnInit {
  customer: any;
  profile: any;
  isProfile: boolean = true;
  @Input() path: boolean | undefined;
  @Input() cart: boolean | undefined;

  constructor(
    private route: Router,
    private service: CustomersService,
    private http: HttpServiceService,
    private toast: HotToastService
  ) {
    this.getProfile();
  }

  ngOnInit(): void {
    if (this.cart == false) {
      this.toast.error('Please Login to Checkout');
      this.route.navigate(['/shop/auth']);
    }
  }
  getProfile() {
    this.customer = this.service.getCustomer();
    if (this.customer) {
      this.http.get('shop/auth/self').subscribe({
        next: (res) => {
          // console.log(res);
          this.profile = res;
        },
      });
    }
  }
  Logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/shop/products']);
  }
}
