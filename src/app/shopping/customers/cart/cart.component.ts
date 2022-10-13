import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addCheckoutItem, cartCounter, removeItem } from '../../State/cart.action';
import { getCartProducts } from '../../State/cart.selector';
import { cart, cartInterface } from '../../State/cart.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  show: any = [];
  cart!: cartInterface[];
  constructor(private state: Store<{ cart: cart }>, private route: Router) {}

  ngOnInit(): void {
    this.state.select(getCartProducts).subscribe((data) => {
      this.cart = data;
      console.log(data);
    });
  }
  minusCount(product: cartInterface) {
    this.cart?.forEach((element) => {
      if (element.productId === product.productId) {
        let updateProduct: cartInterface = {
          productId: element.productId,
          name: element.name,
          price: element.price,
          qty: element.qty - 1,
          subTotal: (element.qty - 1) * element.price,
          images: element.images,
        };
        this.state.dispatch(cartCounter({ products: updateProduct }));
      }
    });
  }
  addCount(product: cartInterface) {
    this.cart?.forEach((element) => {
      if (element.productId === product.productId) {
        let updateProduct: cartInterface = {
          productId: element.productId,
          name: element.name,
          price: element.price,
          qty: element.qty + 1,
          subTotal: (element.qty + 1) * element.price,
          images: element.images,
        };
        this.state.dispatch(cartCounter({ products: updateProduct }));
      }
    });
  }
  deleteProduct(product:cartInterface) {
   this.state.dispatch(removeItem({products:product }))
  }

  checkOut() {
    this.state.dispatch(addCheckoutItem({ checkOut: this.cart }));
    this.route.navigate(['/shop/customer/check-out']);
  }
}
