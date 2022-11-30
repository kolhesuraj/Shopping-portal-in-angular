import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { OrderDeatailsComponent } from '../order-deatails/order-deatails.component';

import { OrderHistoryComponent } from './order-history.component';
const data = {
  user: 1,
};

class httpservice {
  get(): Observable<any> {
    return of(data);
  }
  patch(data: any): Observable<any> {
    return of(data);
  }
}
describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let http: HttpServiceService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderHistoryComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        { provide: HttpServiceService, useClass: httpservice },
        HotToastService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    http = TestBed.inject(HttpServiceService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('order Details', () => {
    component.orderDetails('1');
  });

  it('Navigate to next page', () => {
    component.gotoPage(1);
  });

  it('hit dishpatch order api', () => {
    component.dispatchOrder(1);
  });
  it('hit Diliver order api', () => {
    component.deliveredOrder(1);
  });
  it('hit Cancle order api', () => {
    component.cancleOrder(1);
  });
});
