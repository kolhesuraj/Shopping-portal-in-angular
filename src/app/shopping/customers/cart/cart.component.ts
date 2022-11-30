import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addCheckoutItem, cartCounter, removeAllItem, removeItem } from '../../State/cart.action';
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
  length:number = 0
  constructor(private state: Store<{ cart: cart }>, private route: Router) {}
  
  ngOnInit(): void {
    this.state.select(getCartProducts).subscribe((data) => {
      this.cart = data;
      this.length = this.cart.length
      console.log(data);
    });
  }
  clearCart() {
  this.state.dispatch(removeAllItem());
  }
  minusCount(product: cartInterface) {
    this.cart.forEach((element) => {
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
    this.cart.forEach((element) => {
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
    this.route.navigate([`/shop/customer/check-out/${'isCart'}`]);
  }
}
