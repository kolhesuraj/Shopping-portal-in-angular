import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HotToastService } from '@ngneat/hot-toast';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { CustomersService } from '../../services/customers.service';

import { CheckOutComponent } from './check-out.component';
const cart = {
  images: [
    { url: 'string', public_id: 'string' },
    { url: 'string', public_id: 'string' },
  ],
  name: 'string',
  price: 1000,
  productId: 'string',
  qty: 1,
  subTotal: 100,
  order: {
    _id: 1,
  },
};

const removeitem = { checkOut: cart };
class mockClass {
  select(getCheckOut: any) {}
  dispatch(removeitem: any) {}
}
class httpclass {
  get(url: string): Observable<any> {
    return of(cart);
  }
  post(url: string, body: any): Observable<any> {
    return of(cart);
  }
}

describe('CheckOutComponent', () => {
  let component: CheckOutComponent;
  let fixture: ComponentFixture<CheckOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckOutComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        MatDialogModule,
      ],
      providers: [
        CustomersService,
        HotToastService,
        { provider: HttpServiceService, useClass: httpclass },
        { provider: Store, useClass: mockClass },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('getAddress & getProducts', () => {
    component.getAddress();
    component.cart = [cart];
    // component.getProducts();
    component.minusCount(cart);
    component.setcart();
    component.addCount(cart);
    component.deleteProduct(cart);
  });
  it('address', () => {
    component.selectAddress('address');
    expect(component.address).toEqual('address');
  });
  it('payment', () => {
    component.ProceedToPayment();
    component.isCart == 'isCart'
    component.cart = [cart];
    component.ProceedToPayment();
  });
});
