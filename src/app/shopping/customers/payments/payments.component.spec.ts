import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { CardNumberPipe } from '../../services/Pipes/card-number.pipe';
import { ExpiryDatePipe } from '../../services/Pipes/expiry-date.pipe';
import { ShoppingModule } from '../../shopping.module';

import { PaymentsComponent } from './payments.component';
class httpservice {
  put(): Observable<any> {
    return of([]);
  }
}
describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentsComponent, ExpiryDatePipe, CardNumberPipe],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'shop', component: ShoppingModule },
        ]),
        ReactiveFormsModule,
        BrowserModule,
      ],
      providers: [
        HotToastService,
        { provide: HttpServiceService, useClass: httpservice },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('make payment method', () => {
    component.paymentForm.patchValue({
      nameOnCard: 'name on card',
      cardNumber: '1111111111111111111',
      expiry: '23/2025',
      cvv: '123',
    });
    component.makePayment();
  });
});
