import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  productId: any;
  item: any;
  show: any;
  customer: any;
  profile: any;
  constructor(
    private activateRoute: ActivatedRoute,
    private http: HttpServiceService,
    private service: CustomersService
  ) {
    this.productId = this.activateRoute.snapshot.paramMap.get('id');
    this.getDetails();
    this.getProfile();
  }

  ngOnInit(): void {}
  getDetails() {
    this.http.get(`shop/products/${this.productId}`).subscribe({
      next: (res) => {
        console.log(res);
        this.item = res;
        this.show = this.item.images[0];
      }
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
