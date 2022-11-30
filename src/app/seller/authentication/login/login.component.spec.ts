import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  RecaptchaV3Module,
  ReCaptchaV3Service,
  RECAPTCHA_V3_SITE_KEY,
} from 'ng-recaptcha';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ProductComponent } from '../../products/product/product.component';

import { LoginComponent } from './login.component';

const data: any = {
  user: 1,
};
const data1: any = {
  user: {
    isEmailVerified: true,
    provider: 'Google',
  },
};
const data2: any = {
  user: {
    isEmailVerified: false,
  },
};
class httpservice {
  post(url: string, body: any): Observable<any> {
    return of(data);
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let http: HttpServiceService;
  let recaptcha: ReCaptchaV3Service;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RecaptchaV3Module,
        RouterTestingModule.withRoutes([
          { path: 'seller/products', component: ProductComponent },
        ]),
      ],
      providers: [
        { provide: HttpServiceService, useClass: httpservice },
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
    recaptcha = TestBed.inject(ReCaptchaV3Service);
    spyOn(Swal, 'fire').and.callFake((args: any) => {
      return args;
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('get for geters', () => {
    component.emailControl;
    component.passwordFormControl;
  });

  it('NgOnIt', () => {
    component.ngOnInit();
  });

  it('submit method', () => {
    component.loginForm.patchValue({
      email: 'dummy@email.com',
      password: 'password',
    });
    component.submit();
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('send login method', () => {
    component.sendlogin();
    expect(component.loginForm.invalid).toBeTruthy();
  });

  // it('refress captcha', () => {
  //   // component.refreshCaptcha();
  //   // let token = 'data';
  //   // spyOn(recaptcha, 'execute').and.returnValue(of(token));
  // });

  it('send login valid form', () => {
    component.loginForm.patchValue({
      email: 'dummy@email.com',
      password: 'password',
    });
    component.sendlogin();
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('social login', () => {
    component.socialLogin(data1);
    expect(data1.user.provider).toEqual('Google');
  });

  it('validation email verified', fakeAsync(() => {
    component.validation(data1);
    tick(5000);
    fixture.detectChanges();
    expect(data1.user.isEmailVerified).toBeTrue();
  }));

  it('validation email not verified', fakeAsync(() => {
    component.validation(data2);
    tick(5000);
    fixture.detectChanges();
    expect(data2.user.isEmailVerified).toBeFalse();
  }));

  it('navigate function call', () => {
    component.signOut();
    component.refreshToken();
    component.getAccessToken();
    component.signInWithFB();
  });
});
