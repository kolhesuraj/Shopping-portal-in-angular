import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, UrlSegment } from '@angular/router';
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
    this.recaptchaV3Service
      .execute('importantAction')
      .subscribe((token: string) => {
        console.debug(`Token [${token}] generated`);
        this.loginForm.patchValue({ captcha: token });
        this.sendlogin();
      });
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
        },
        error: (err) => {
          console.log(err);
          Swal.fire(err.error.message);
          this.refreshCaptcha();
        },
      });
    }
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
