import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpServiceService } from 'src/app/services/http/http-service.service';

interface form {
  nameOnCard: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  paymentForm!: FormGroup;
  OrderId: any;
updating: boolean = false;
  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private http: HttpServiceService,
    private toast: HotToastService,
    private route: Router,
  ) {}
  ngOnInit(): void {
    this.OrderId = this.activateRoute.snapshot.paramMap.get('id');

    this.paymentForm = this.fb.group({
      nameOnCard: ['', [Validators.required]],
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      expiry: ['', [Validators.required,Validators.maxLength(7)]],
      cvv: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
    });
  }
  get nameOnCard() {
    return this.paymentForm.get('nameOnCard');
  }
  get cardNumber() {
    return this.paymentForm.get('cardNumber');
  }
  get cvv() {
    return this.paymentForm.get('cvv');
  }
  get expiry() {
    return this.paymentForm.get('expiry');
  }
  makePayment() {
    console.log(this.paymentForm.value);
    if (this.paymentForm.valid) {
      this.updating = true;
      this.http
        .put(`shop/orders/confirm/${this.OrderId} `, this.paymentForm.value)
        .subscribe({
          next: (res:any) => {
            console.log(res);
            this.toast.success(res.message)
            this.route.navigate(['/shop']);
          }, error: (err) => {
            this.updating = false;
          }
        });
    }
  }
}
