import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationVarifyEmailComponent } from './registration-varify-email.component';

describe('RegistrationVarifyEmailComponent', () => {
  let component: RegistrationVarifyEmailComponent;
  let fixture: ComponentFixture<RegistrationVarifyEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationVarifyEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationVarifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
