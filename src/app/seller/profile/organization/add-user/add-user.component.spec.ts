import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpServiceService } from 'src/app/services/http/http-service.service';

import { AddUserComponent } from './add-user.component';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      imports: [HttpClientModule,HttpClientTestingModule, ReactiveFormsModule],
      providers: [HttpServiceService],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ConfirmPassword;
  });
  it('reset', () => {
    component.reset();
    expect(component.submited).toBeFalse();
  });

  it('adduser', () => {
    component.addUser();
    expect(component.submited).toBeTrue();
    component.register.patchValue({
      name: 'name',
      role: 'role',
      email: 'email@gmail.com',
      password: 'password',
      ConfirmPassword: 'password',
    });
    component.addUser();
    expect(component.register.valid).toBeTrue();
  });
});
