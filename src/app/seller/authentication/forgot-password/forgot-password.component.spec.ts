import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReCaptchaV3Service, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { ForgotPasswordComponent } from './forgot-password.component';

function sleep(ms: number | undefined) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
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

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let service: HttpServiceService;
  // let recapcha: ReCaptchaV3Service;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        HttpClientModule,
      ],
      providers: [
        { provide: ReCaptchaV3Service, useClass: dummyRecaptchaService },
        HttpServiceService,
        ReCaptchaV3Service,
        {
          provide: RECAPTCHA_V3_SITE_KEY,
          useValue: environment.recaptcha.siteKey,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(HttpServiceService);
    // recapcha = TestBed.inject(ReCaptchaV3Service);
    sleep(7000);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submit will be exicute with form invalid', () => {
    component.submit();
    expect(component.forgotPasswordForm.invalid).toBe(true);
    expect(component.Message).toBe(true);
  });

  it('submit will be exicute with form valid', () => {
    component.forgotPasswordForm.patchValue({ email: 'dummy@email.com' });
    component.submit();
    expect(component.forgotPasswordForm.valid).toBe(true);
    expect(component.updating).toBe(true);
    let token = 'data';
    // spyOn(recapcha, 'execute').and.returnValue(of(token));
  });

  it('email wiil be sent', () => {
    component.forgotPasswordForm.patchValue({ email: 'dummy@email.com' });
    let token = 'data';
    // spyOn(recapcha, 'execute').and.returnValue(of(token));
    spyOn(Swal, 'fire');
    component.sendEmail();
    expect(component.forgotPasswordForm.valid).toBeTrue();
    // service
    //   .post('auth/forgot-password', {
    //     email: 'dummy@email.com',
    //     captcha: token,
    //   })
    //   .subscribe({
    //     next: (res: any) => {
    //       // spyOn(Swal, 'fire').and.callFake((args: any) => args.onAfterClose());
    //       expect(component.forgotPasswordForm.reset()).toBeTruthy();
    //     },
    //   });
  });

  it('go back', () => {
    component.goback();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/seller/auth/login']);
  });
});
