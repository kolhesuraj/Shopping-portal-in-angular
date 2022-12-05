import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HotToastService } from '@ngneat/hot-toast';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';

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
  let toastrService: jasmine.SpyObj<HotToastService>;
  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<HotToastService>('HotToastService', [
      'error',
      'success',
    ]);
    await TestBed.configureTestingModule({
      declarations: [OrderHistoryComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: HttpServiceService, useClass: httpservice },
        { provide: HotToastService, useValue: toastrService },
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
  // it('order Details', () => {
  //   component.orderDetails('1');
  // });

  it('Navigate to next page', () => {
    component.gotoPage(1);
    expect(component.pagenumber).toBe(1);
  });

  it('hit dishpatch order api', () => {
    component.dispatchOrder(1);
    expect(toastrService.success).toHaveBeenCalledWith(
      'Order Marked as Dispatched!!'
    );
  });
  it('hit Diliver order api', () => {
    component.deliveredOrder(1);
    expect(toastrService.success).toHaveBeenCalledWith(
      'Order Marked as Delivered!!'
    );
  });
  it('hit Cancle order api', () => {
    component.cancleOrder(1);
    expect(toastrService.error).toHaveBeenCalledWith('Order Canceled!!');
  });
});
