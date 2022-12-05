import { fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsModule } from 'src/app/seller/products/products.module';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  // let routerSpy = { navigate: jasmine.createSpy('navigate') };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'seller/products', component: ProductsModule },
        ]),
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });


  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('test', () => {
    localStorage.removeItem('LoginUser');

    let result = guard.canActivate();
    expect(result).toBeTrue();
  });
  it('test2', fakeAsync(() => {
    const name = '10';
    localStorage.setItem('LoginUser', name);
    // spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    let result = guard.canActivate();
    expect(result).toBeFalse();
  }));
});
