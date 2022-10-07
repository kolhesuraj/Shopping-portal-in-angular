import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { CustomersService } from '../../services/customers.service';
import { StepperOrientation } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  constructor(
    private service: CustomersService,
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }
  products: any = [];
  show: any = [];
  stepperOrientation: Observable<StepperOrientation>;

  ngOnInit(): void {
    this.getProducts();
    console.log(this.products);
  }
  getProducts() {
    this.products = this.service.checkOut;
    // this.show = this.products.images;
    this.products.forEach((element: any, index: number) => {
      this.show[index] = element.images[0];
    });
  }
  minusCount(index: number) {
    this.products[index].qty -= 1;
  }
  addCount(index: number) {
    this.products[index].qty += 1;
  }
  deleteProduct(index: number) {
    console.log(this.products)
    this.products.splice(index, 1);
    console.log(this.products)
  }
}
