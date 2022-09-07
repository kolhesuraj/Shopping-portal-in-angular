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
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private ls: LoginService,
    private httpservice: HttpServiceService,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      captcha: [''],
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
    // console.log(this.loginForm.value);
    if (
      this.emailControl?.value == '' &&
      this.passwordFormControl?.value == ''
    ) {
      this.massage = true;
      this.loginFaildMssage = false;
    } else {
      console.log(this.loginForm.value);
      this.httpservice.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          localStorage.setItem('LoginUser', res.token);
          // localStorage.setItem('data', JSON.stringify(res));
          this.tocken = 1;
          if (res.user.isEmailVerified == true) {
            setTimeout(() => {
              this.route.navigate(['/profile']);
              this.tocken = 0;
            }, 1500);
          } else {
            Swal.fire('email not varified', ' please varify');
            setTimeout(() => {
              this.route.navigate(['/profile']);
              this.tocken = 0;
            }, 1500);
            // this.route.navigate(['/auth/email-varify']);
          }
        },
        error: (err) => {
          console.log(err);
          Swal.fire(err.error.message);
          // alert(err.error.message)
          this.refreshCaptcha();
        },
      });
    }
  }

  register() {
    this.route.navigate(['/auth/register']);
  }

  refreshCaptcha() {
    this.recaptchaV3Service
      .execute('importantAction')
      .subscribe((token: string) => {
        console.debug(`Token [${token}] generated`);
        this.loginForm.patchValue({captcha:token})
      });
  }
}
