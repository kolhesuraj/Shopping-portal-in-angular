import { fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductComponent } from 'src/app/seller/products/product/product.component';
import { ProductsModule } from '../../products/products.module';

import { LoginGaurdGuard } from './login-gaurd.guard';

describe('LoginGaurdGuard', () => {
  let guard: LoginGaurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'shop/products', component: ProductsModule },
        ]),
      ],
    });
    guard = TestBed.inject(LoginGaurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('test', () => {
    localStorage.removeItem('token');

    let result = guard.canActivate();
    expect(result).toBeTrue();
  });
  it('test2', fakeAsync(() => {
    const name = '10';
    localStorage.setItem('token', name);
    // spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    let result = guard.canActivate();
    expect(result).toBeFalse();
  }));
});
