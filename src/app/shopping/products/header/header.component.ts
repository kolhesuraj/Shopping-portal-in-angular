import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { CustomersService } from '../../services/customers.service';
import { getCartProducts } from '../../State/cart.selector';
import { cart } from '../../State/cart.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  customer: any;
  profile: any;
  cartLength: number = 0;
  constructor(
    private service: CustomersService,
    private http: HttpServiceService,
    private store: Store<{ cart: cart }>
  ) {
    this.getProfile();
  }

  ngOnInit(): void {
    this.store.select(getCartProducts).subscribe((data) => {
      this.cartLength = data.length;
    });
  }
  getProfile() {
    this.customer = this.service.getCustomer();
    console.log(this.customer);

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
    this.getProfile();
  }
}
