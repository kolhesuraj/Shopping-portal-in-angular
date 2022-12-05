import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RecaptchaV3Module, ReCaptchaV3Service, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { environment } from 'src/environments/environment';

import { RegistrationComponent } from './registration.component';
const data = {
  user: 1,
};
class httpservice {
  post(url: string, body: any): Observable<any> {
    return of(data);
  }
}
class dummyRecaptchaService {
  response = [
    {
      token: 'token',
    },
  ];
  execute(): Observable<any> {
    return of(this.response);
  }
}
describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientTestingModule,
        RecaptchaV3Module,
        RouterTestingModule,
      ],
      providers: [
        { provuide: HttpServiceService, useClass: httpservice },
        { provide: ReCaptchaV3Service, useClass: dummyRecaptchaService },
        {
          provide: RECAPTCHA_V3_SITE_KEY,
          useValue: environment.recaptcha.siteKey,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('geters', () => {
    component.CompanyName;
    component.ConfirmPassword;
  });
  it('register Login', () => {
    component.registerLogin();
    expect(component.submited).toBeTrue();
  });
  it('register Login', () => {
    component.captcha = 'captcha';
    component.register.patchValue({
      name: 'name',
      email: 'email@gmail.com',
      password: 'password',
      ConfirmPassword: 'password',
      captcha: component.captcha,
      addresses: {
        street: 'street',
        addressLine2: [''],
        city: 'pune',
        state: 'state',
        pin: 414302,
      },
    });
    component.registerLogin();
    expect(component.submited).toBeFalse();
  });

  it('reset form', () => {
    component.reset();
    expect(component.submited).toBeFalse();
  });
});
