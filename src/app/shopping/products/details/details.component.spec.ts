import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HotToastService } from '@ngneat/hot-toast';
import { Store, StoreModule } from '@ngrx/store';
import { NgDompurifyPipe } from '@tinkoff/ng-dompurify';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { CustomersService } from '../../services/customers.service';

import { DetailsComponent } from './details.component';
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
describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let toastrService: jasmine.SpyObj<HotToastService>;
  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<HotToastService>('HotToastService', [
      'info',
      'success',
    ]);
    await TestBed.configureTestingModule({
      declarations: [DetailsComponent, NgDompurifyPipe],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot({}),
      ],
      providers: [
        HotToastService,
        CustomersService,
        { provide: HotToastService, useValue: toastrService },
        { provide: HttpServiceService, useClass: httpclass },
        { provider: Store, useClass: mockClass },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('logout ', () => {
    component.Logout();
    expect(localStorage.getItem('token')).toBeNull();
  });
  const product = {
    productId: 'product._id',
    name: 'product.name',
    price: 1,
    qty: 1,
    subTotal: 1,
    images: [{ url: 'string', public_id: 'string' }],
  };
  it('add to cart', () => {
    component.cart = [product];
    component.addToCart(product);
    expect(toastrService.success).toHaveBeenCalledWith(
      'product.name added to cart'
    );
  });
  it('buy now', () => {
    component.BuyNow(product);
  });
  it('is in cart', () => {
    component.cart = [product]
    component.isInCart(product);
  })
});
