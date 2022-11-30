import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { RegistrationComponent } from './registration.component';

const data = {
  user: 1,
};

class http {
  post(url: string, body: any): Observable<any> {
    return of(data);
  }
  sendVerrification(data: any): Observable<any> {
    return of(data);
  }
}

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [RecaptchaV3Module, ReactiveFormsModule, HttpClientModule],
      providers: [
        HotToastService,
        { provider: HttpServiceService, useClass: http },
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getet', () => {
    component.ConfirmPassword;
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
    // expect(component.sendVerificationEmail(data)).toHaveBeenCalled();
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
  });
  it('verification', () => {
    component.sendVerificationEmail(data);
  });
});
