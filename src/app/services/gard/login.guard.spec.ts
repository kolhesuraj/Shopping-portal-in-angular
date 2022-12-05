import { fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from 'src/app/seller/authentication/login/login.component';

import { LoginGuard } from './login.guard';
describe('LoginGuard', () => {
  let guard: LoginGuard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'seller/auth/login', component: LoginComponent },
        ]),
      ],
    });

    guard = TestBed.inject(LoginGuard);
  });


  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('guard', () => {
    localStorage.removeItem('LoginUser');
    let result = guard.canActivate();
    expect(result).toBeFalse();
  });
  it('test2', fakeAsync(() => {
    const name = '10';
    localStorage.setItem('LoginUser', name);
    // spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    let result = guard.canActivate();
    expect(result).toBe(true);
  }));
});
