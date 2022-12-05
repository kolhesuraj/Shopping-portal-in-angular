import { state } from '@angular/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';

import { CartComponent } from './cart.component';
class mockClass {
  select() {}
}

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
};

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let store: StoreModule;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      providers: [{ provider: Store, useClass: mockClass }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = StoreModule;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('clear cart', () => {
    component.clearCart();
  });
  it('minus count', () => {
    component.cart = [cart];
    component.minusCount(cart);
  });
  it('minus count', () => {
    component.cart = [cart];
    component.addCount(cart);
  });
  it('delete product', () => {
    component.deleteProduct(cart);
    component.checkOut();
  });
});
