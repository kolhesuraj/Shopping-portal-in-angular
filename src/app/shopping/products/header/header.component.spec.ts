import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { CustomersService } from '../../services/customers.service';

import { HeaderComponent } from './header.component';
const data = {
  picture: 'profile photo url',
  name: 'name',
};
class httpservice {
  get(url: string): Observable<any> {
    return of(data);
  }
}
class service {
  getCustomer() {
    return true;
  }
}
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        { Provide: HttpServiceService, useClass: httpservice },
        { provide: CustomersService, useClass: service },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('logout ', () => {
    localStorage.setItem('token', 'abcd');
    component.Logout();
    expect(localStorage.getItem('token')).toBeNull();
  });
  it('get profile', () => {
    // component.customer = true;
    component.getProfile();
  });
});
