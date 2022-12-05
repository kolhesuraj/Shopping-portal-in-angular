import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { RecaptchaV3Module, ReCaptchaV3Service, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { RegistrationComponent } from './registration.component';

const data = {
  user: 1,
};
class httpService {
  sendVerrification(token: any): Observable<any> {
    return of(data);
  }
  post(url: string): Observable<any> {
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
  let http: HttpServiceService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [
        RecaptchaV3Module,
        ReactiveFormsModule,
        HttpClientTestingModule,
        HttpClientModule
      ],
      providers: [
        HotToastService,
        { provide: ReCaptchaV3Service, useClass: dummyRecaptchaService },
        { provide: HttpServiceService, useClass: httpService },
        {
          provide: RECAPTCHA_V3_SITE_KEY,
          useValue: environment.recaptcha.siteKey,
        },
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(
                  '893913805202-rg7o6somctq21ike6dk1u0d696t64e0q.apps.googleusercontent.com'
                ),
              },
              {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider('365586852354146'),
              },
            ],
            onError: (err) => {
              console.error(err);
            },
          } as SocialAuthServiceConfig,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    http = TestBed.inject(HttpServiceService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('geter', () => {
    component.ConfirmPassword;
    expect(component.ConfirmPassword?.valid).toBeTrue();
  });

  it('registration sending to API', () => {
    component.register.patchValue({
      name: ' name',
      company: 'companyName',
      email: 'dummy@email.com',
      password: 'password',
    });
    component.registerLogin();
    expect(component.register.valid).toBeTrue();
    expect(component.submited).toBeFalse();
    expect(component.updating).toBeTrue();
    spyOn(Swal, 'fire').and.callFake((args: any) => {
      return args;
    });
  });
  it('registration sending to API Invalid form', () => {
    component.registerLogin();
    expect(component.register.valid).toBeFalse();
  });

  it('reset', () => {
    component.reset();
    expect(component.submited).toBeFalse();
    expect(component.errorFromserver).toEqual('');
  });
  it('verification', () => {
    expect(component.tocken).toEqual(0);
    component.sendVerificationEmail(data);
  });
});
