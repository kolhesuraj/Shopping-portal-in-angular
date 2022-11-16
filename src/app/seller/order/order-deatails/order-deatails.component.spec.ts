import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDeatailsComponent } from './order-deatails.component';

describe('OrderDeatailsComponent', () => {
  let component: OrderDeatailsComponent;
  let fixture: ComponentFixture<OrderDeatailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDeatailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDeatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
