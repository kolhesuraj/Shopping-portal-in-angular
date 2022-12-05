import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthServiceConfig,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  RecaptchaV3Module,
  ReCaptchaV3Service,
  RECAPTCHA_V3_SITE_KEY,
} from 'ng-recaptcha';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { environment } from 'src/environments/environment';

import { LoginComponent } from './login.component';

const data = {
  user: 1,
};
class httpservice {
  post(): Observable<any> {
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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let http: HttpServiceService;
  let authService: SocialAuthService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RecaptchaV3Module,
        RouterTestingModule,
      ],
      providers: [
        { provide: HttpServiceService, useClass: httpservice },
        { provide: ReCaptchaV3Service, useClass: dummyRecaptchaService },
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

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    http = TestBed.inject(HttpServiceService);
    authService = TestBed.inject(SocialAuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login', fakeAsync(
    inject([Router], (router: Router) => {
      spyOn(router, 'navigate').and.stub();
      component.captcha = 'captch';
      component.loginForm.patchValue({
        email: 'email@gmail.com',
        password: 'password',
        captcha: component.captcha,
      });
      component.submit();
      expect(component.loginForm.valid).toBeTrue();
      tick(1500);
      expect(router.navigate).toHaveBeenCalledWith(['shop/products']);
      // expect(routerSpy.navigate).toHaveBeenCalledWith(['../shop']);
    })
  ));
  it('login flase form', () => {
    component.submit();
    expect(component.massage).toBeTrue();
  });
  it('geters', () => {
    component.emailControl;
    component.passwordFormControl;
    expect(component.emailControl).toBeTruthy();
  });
  it('sign Out', () => {
    spyOn(authService, 'signOut');
    component.signOut();
  });
});
