import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';

import { UpdateOrgComponent } from './update-org.component';

describe(' UpdateOrgComponent', () => {
  let component: UpdateOrgComponent;
  let fixture: ComponentFixture<UpdateOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateOrgComponent],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [
        HttpServiceService,
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(Swal, 'fire');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('update', () => {
    component.editForm.patchValue({
      email: 'email@gmail.com',
      name: 'name',
    });
    component.update();
  });
});
