import { fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CartGuardGuard } from './cart-guard.guard';

describe('CartGuardGuard', () => {
  let guard: CartGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
    });
    guard = TestBed.inject(CartGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('test', () => {
    localStorage.removeItem('token');

    let result = guard.canActivate();
    expect(result).toBeFalse();
  });
  it('test2', fakeAsync(() => {
    const name = '10';
    localStorage.setItem('token', name);
    // spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    let result = guard.canActivate();
    expect(result).toBeTrue();
  }));
});
