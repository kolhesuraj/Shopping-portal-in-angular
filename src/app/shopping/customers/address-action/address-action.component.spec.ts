import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http/http-service.service';

import { AddressActionComponent } from './address-action.component';

describe('AddressActionComponent', () => {
  let component: AddressActionComponent;
  let fixture: ComponentFixture<AddressActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressActionComponent],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [
        HttpServiceService,
        {
          provide: MatDialogRef,
          useValue: {},
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
});
