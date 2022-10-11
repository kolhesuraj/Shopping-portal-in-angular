import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CustomersService } from '../../services/customers.service';
import { StepperOrientation } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { cart, cartInterface } from '../../State/cart.state';
import { Store } from '@ngrx/store';
import { Counter, removeCheckoutItem } from '../../State/cart.action';
import { getCheckOut } from '../../State/cart.selector';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { Validators } from 'ngx-editor';
import { AddressActionComponent } from '../address-action/address-action.component';
import { MatDialog } from '@angular/material/dialog';

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
  stepperOrientation: Observable<StepperOrientation>;
  addresses: any;
  address: any;
  constructor(
    breakpointObserver: BreakpointObserver,
    private store: Store<{ cart: cart }>,
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private http: HttpServiceService
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

  ngOnInit(): void {}
  getAddress() {
    this.http.get('customers/address').subscribe({
      next: (res) => {
        console.log(res);
        this.addresses = res;
      },
    });
  }
  getProducts() {
    this.store.select(getCheckOut).subscribe((data) => (this.cart = data));
    this.cart.forEach((element: any, index: number) => {
      this.show[index] = element.images[0];
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
}
