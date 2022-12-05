import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';

import { OrderDetailsComponent } from './order-details.component';

class httpservice {
  get(): Observable<any> {
    return of([1, 2]);
  }
}

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDetailsComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [{ provide: HttpServiceService, useClass: httpservice }],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('get order details', () => {
    component.getOrderDetails();
    expect(component.orderDetails).toEqual(1);
  });
  it('open pdf function', () => {
    component.openPDF();
  });
});
