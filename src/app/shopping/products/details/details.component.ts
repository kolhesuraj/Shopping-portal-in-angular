import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Store } from '@ngrx/store';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { CustomersService } from '../../services/customers.service';
import { addItem, addCheckoutItem } from '../../State/cart.action';
import { getCartProducts } from '../../State/cart.selector';
import { cart, cartInterface } from '../../State/cart.state';

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
  cart: cartInterface[] | undefined;
  profile: any;
  constructor(
    private activateRoute: ActivatedRoute,
    private http: HttpServiceService,
    private service: CustomersService,
    private route: Router,
    private store: Store<{ cart: cart }>,
    private toaster: HotToastService
  ) {
    this.productId = this.activateRoute.snapshot.paramMap.get('id');
    this.getDetails();
    this.getProfile();
  }

  ngOnInit(): void {
    this.store.select(getCartProducts).subscribe({
      next: (res) => {
        this.cart = res;
      },
    });
  }
  getDetails() {
    this.http.get(`shop/products/${this.productId}`).subscribe({
      next: (res) => {
        console.log(res);
        this.item = res;
        this.show = this.item.images[0];
      },
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
  addToCart(product: any) {
    // console.log(product);
    let addProduct: cartInterface = {
      productId: product._id,
      name: product.name,
      price: product.price,
      qty: 1,
      subTotal: product.price * 1,
      images: product.images,
    };
    if (!this.isInCart(addProduct)) {
      this.toaster.success(`${addProduct.name} added to cart`)
      this.store.dispatch(addItem({ products: addProduct }));
    }
  }

  BuyNow(product: any) {
    // console.log(product);
    const checkOut: cartInterface[] = [
      {
        productId: product._id,
        name: product.name,
        price: product.price,
        qty: 1,
        subTotal: product.price * 1,
        images: product.images,
      },
    ];
    this.store.dispatch(addCheckoutItem({ checkOut: checkOut }));
    this.route.navigate(['/shop/customer/check-out']);
  }

  isInCart(product: cartInterface) {
    let isAvailbe: Boolean = false;
    this.cart?.forEach((element) => {
      if (element.productId === product.productId) {
        this.toaster.info(`${product.name} already in cart`);
        isAvailbe = true;
      }
    });
    return isAvailbe;
  }
}
