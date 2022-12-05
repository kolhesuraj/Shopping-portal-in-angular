import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';

import { AddressActionComponent } from './address-action.component';
class close {
  close() {}
  put(): Observable<any> {
    return of();
  }
  post(): Observable<any> {
    return of();
  }
}
describe('AddressActionComponent', () => {
  let component: AddressActionComponent;
  let fixture: ComponentFixture<AddressActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressActionComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, HttpClientModule],
      providers: [
        { provide: HttpServiceService, useClass: close },
        {
          provide: MatDialogRef,
          useClass: close,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('reset', () => {
    component.reset();
  });
  it('form invalid', () => {
    component.saveAddress();
    expect(component.submited).toBeTrue();
  });
  it('add adress', () => {
    component.data = null;
    component.addressFrom.patchValue({
      street: 'this.data.street',
      addressLine2: 'this.data.addressLine2',
      city: 'this.data.city',
      state: 'this.data.state',
      pin: 414302,
    });
    component.saveAddress();
    expect(component.submited).toBeFalsy();
  });
  it('add adress', () => {
    component.addressFrom.patchValue({
      street: 'this.data.street',
      addressLine2: 'this.data.addressLine2',
      city: 'this.data.city',
      state: 'this.data.state',
      pin: 414302,
    });
    component.saveAddress();
    expect(component.submited).toBeFalsy();
  });
});
