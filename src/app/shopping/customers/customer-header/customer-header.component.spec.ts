import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { CustomersService } from '../../services/customers.service';

import { CustomerHeaderComponent } from './customer-header.component';

describe('CustomerHeaderComponent', () => {
  let component: CustomerHeaderComponent;
  let fixture: ComponentFixture<CustomerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerHeaderComponent],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [HotToastService, HttpServiceService, CustomersService],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('cart false', () => {
    component.cart = false;
    component.ngOnInit();
    component.Logout();
  });
});
