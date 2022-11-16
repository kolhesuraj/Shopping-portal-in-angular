import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNavComponent } from './order-nav.component';

describe('OrderNavComponent', () => {
  let component: OrderNavComponent;
  let fixture: ComponentFixture<OrderNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
