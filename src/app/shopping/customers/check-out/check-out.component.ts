import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StepperOrientation } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { cart, cartInterface, items } from '../../State/cart.state';
import { Store } from '@ngrx/store';
import {
  Counter,
  removeAllItem,
  removeCheckoutItem,
} from '../../State/cart.action';
import { getCheckOut } from '../../State/cart.selector';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { Validators } from 'ngx-editor';
import { AddressActionComponent } from '../address-action/address-action.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomersService } from '../../services/customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast } from 'ngx-toastr';
import { HotToastService } from '@ngneat/hot-toast';

// interface address {
//   street: string;
//   addressLine2: string;
//   city: string;
//   state: string;
//   pin: string;
// }

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  cart!: cartInterface[];
  addressFormGroup!: FormGroup;
  show: any = [];
  totalamount: number = 0;
  stepperOrientation: Observable<StepperOrientation>;
  addresses: any;
  address: any;
  finalDetails: items[] = [];
  delivary = 0;
  isCart: any;

  constructor(
    breakpointObserver: BreakpointObserver,
    private store: Store<{ cart: cart }>,
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private http: HttpServiceService,
    private service: CustomersService,
    private route: Router,
    private toast: HotToastService,
    private param: ActivatedRoute,
    private state: Store<{ cart: cart }>
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    this.getProducts();

    this.addressFormGroup = this.fb.group({
      address: ['', [Validators.required]],
    });

    this.getAddress();
  }
  ngOnInit(): void {
    this.isCart = this.param.snapshot.paramMap.get('isCart');
  }
  getAddress() {
    this.http.get('customers/address').subscribe({
      next: (res) => {
        console.log(res);
        this.addresses = res;
      },
    });
  }
  getProducts() {
    this.store.select(getCheckOut).subscribe((data) => {
      this.cart = data;
      console.log(this.cart);
      this.cart.forEach((element: any, index: number) => {
        this.show[index] = element.images[0];
        // console.log(element);
        this.totalamount = this.totalamount + element.subTotal;
        this.delivary = this.delivary + element.qty * 40;
        console.log(element.qty * 40);
      });
      this.totalamount = this.totalamount + this.delivary;
    });

    console.log(this.cart.length * 40);
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
        this.store.dispatch(Counter({ checkOut: updateProduct }));
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
        this.store.dispatch(Counter({ checkOut: updateProduct }));
      }
    });
  }
  deleteProduct(product: cartInterface) {
    this.store.dispatch(removeCheckoutItem({ checkOut: product }));
  }
  selectAddress(address: any) {
    this.address = address;
  }
  addAddress() {
    const _dialog = this.matDialog.open(AddressActionComponent, {
      data: null,
    });
    _dialog.afterOpened().subscribe({
      next: () => {},
    });
    _dialog.afterClosed().subscribe({
      next: () => {
        this.getAddress();
      },
    });
  }
  click = false;

  ProceedToPayment() {
    let total = 0;
    this.click = true;
    if (this.cart.length == 0) {
      this.toast.error("Can't procced without Products");
    } else {
      this.cart.forEach((element) => {
        this.finalDetails.push({
          productId: element.productId,
          name: element.name,
          price: element.price,
          qty: element.qty,
          subTotal: element.subTotal,
        });
        total += element.subTotal;
      });

      let finalProducts = {
        items: this.finalDetails,
        deliveryFee: this.delivary,
        total: total + this.delivary,
        address: this.address,
      };
      console.log(finalProducts);
      let Order: any;
      this.http.post('shop/orders', finalProducts).subscribe({
        next: (res) => {
          console.log(res);
          if (this.isCart == 'isCart') {
            this.state.dispatch(removeAllItem());
          }
          Order = res;
          this.service.OrderId = Order;
          console.log(this.service.OrderId);
          this.toast.show(`<p>Your Order Has been Placed</p> 
        <p>Order Id : ${Order.order._id}</p>
        <p>Payable amount : ${Order.order.total}</p>
        Please make payment to confirm`);
          this.route.navigate([`/shop/customer/payment/${Order.order._id}`]);
        },
      });
    }
  }
}
