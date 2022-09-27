import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressActionComponent } from './address-action.component';

describe('AddressActionComponent', () => {
  let component: AddressActionComponent;
  let fixture: ComponentFixture<AddressActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
