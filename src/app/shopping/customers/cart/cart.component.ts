import { Component, OnInit } from '@angular/core';
import { State } from '@ngrx/store';
import { cart, cartInterface } from '../../State/cart.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartValue !: cart
  constructor(private state: State<cart>) { }

  ngOnInit(): void {
    this.state.subscribe(data => {
      console.log(data.cart.products)
      this.cartValue = data.cart.products;
    })
  }

}
