import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { LoginService } from 'src/app/services/login.service';
// import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  user!: SocialUser;
  accessToken!: string;
  captcha: any;
  counter: boolean = false;
  updating: boolean = false;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private ls: LoginService,
    private httpservice: HttpServiceService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private authService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      captcha: [''],
    });

    this.refreshCaptcha();
    this.authService.authState.subscribe((user) => {
      this.counter = true;
      // console.log(user);
      this.user = user;
      this.socialLogin(user);
    });
  }

  refreshCaptcha() {
    this.recaptchaV3Service
      .execute('importantAction')
      .subscribe((token: string) => {
        console.debug(`Token [${token}] generated`);
        this.captcha = token;
      });
  }

  get emailControl() {
    return this.loginForm.get('email');
  }
  get passwordFormControl() {
    return this.loginForm.get('password');
  }
  massage = false;
  loginFaildMssage = false;
  tocken = 0;
  errMassage!: string;
  submit() {
    // console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.updating = true;
       this.recaptchaV3Service
      .execute('importantAction')
      .subscribe((token: string) => {
        console.debug(`Token [${token}] generated`);
        this.loginForm.patchValue({ captcha: token });
        this.sendlogin();
      });
    }
   
  }

  sendlogin() {
    if (
      this.emailControl?.value == '' &&
      this.passwordFormControl?.value == ''
    ) {
      this.massage = true;
      this.loginFaildMssage = false;
    } else {
      this.httpservice.post('auth/login', this.loginForm.value).subscribe({
        next: (res: any) => {
          this.validation(res);
          this.refreshCaptcha();
        }
      });
    }
  }

  socialLogin(user: any) {
    let data: any;
    let provider!: String;
    if (user?.provider == 'GOOGLE') {
      provider = 'google';
      data = {
        token: user.idToken,
        captcha: this.captcha,
      };
    } else {
      provider = 'facebook';
      data = {
        token: user.authToken,
        captcha: this.captcha,
      };
    }
    this.httpservice.post(`auth/login/${provider}`, data).subscribe({
      next: (res: any) => {
        this.validation(res);
        this.refreshCaptcha();
      }
    });

    // this.httpservice.socialLogin(user, this.captcha).subscribe({
    //   next: (res: any) => {
    //     // console.log(res);
    //     this.validation(res);
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //   },
    // });
  }

  validation(res: any) {
    this.tocken = 1;
    localStorage.setItem('LoginUser', res.token);
    if (res.user.isEmailVerified == true) {
      setTimeout(() => {
        this.route.navigate(['/seller/products']);
        this.tocken = 0;
      }, 1500);
    } else {
      Swal.fire('email not varified', ' please varify');
      setTimeout(() => {
        this.route.navigate(['/seller/products']);
        this.tocken = 0;
      }, 1500);
    }
  }
  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
  getAccessToken(): void {
    this.authService
      .getAccessToken(GoogleLoginProvider.PROVIDER_ID)
      .then((accessToken) => (this.accessToken = accessToken));
  }

  signInWithFB(): void {
    this.refreshCaptcha();
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  register() {
    this.route.navigate(['/seller/auth/register']);
  }
  forgot() {
    this.route.navigate(['/seller/auth/forgot-password']);
  }
  signOut(): void {
    this.authService.signOut();
  }
}
