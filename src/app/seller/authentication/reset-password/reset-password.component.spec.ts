import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';

import { ResetPasswordComponent } from './reset-password.component';

const data = {
  user: 1,
};


describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        HttpClientModule
      ],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(Swal, 'fire').and.callFake((args: any) => {
      return args;
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submit valid form', () => {
    component.resetPassowrdform.patchValue({
      password: 'password',
      confirmPassword: 'password',
    });
    component.submit();
    expect(component.resetPassowrdform.valid).toBeTrue();
  });
  it('submit invalid form', () => {
    component.submit();
    expect(component.resetPassowrdform.valid).toBeFalse();
  });
});
