import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';
import { CustomersService } from '../../services/customers.service';

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
    private httpservice: HttpServiceService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private authService: SocialAuthService,
    private service: CustomersService
  ) {}

  refreshCaptcha() {
    this.recaptchaV3Service
      .execute('importantAction')
      .subscribe((token: string) => {
        console.debug(`Token [${token}] generated`);
        this.captcha = token;
      });
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      captcha: ['', [Validators.required]],
    });
    this.refreshCaptcha();
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
    this.loginForm.patchValue({ captcha: this.captcha });
    if (this.loginForm.valid) {
      this.updating = true;
      this.httpservice.post('shop/auth/login', this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.tocken = 1;
          setTimeout(() => {
            this.route.navigate(['/shop/products']);
            this.tocken = 0;
          }, 1500);
        },
      });
    } else {
      this.massage = true;
      this.loginFaildMssage = false;
    }
  }

  register() {
    this.route.navigate(['/shop/auth/register']);
  }
  forgot() {
    this.route.navigate(['/shop/auth/forgot-password']);
  }
  signOut(): void {
    this.authService.signOut();
  }
}
