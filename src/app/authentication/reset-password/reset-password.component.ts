import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { passwordValidator } from '../registration/password.Validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetPassowrdform!: FormGroup;
  Message!: boolean;
  token: any;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private recaptchaV3Service: ReCaptchaV3Service,
    private httpservice: HttpServiceService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.resetPassowrdform = this.fb.group(
      {
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        captcha: [''],
        token: [''],
      },
      { validator: passwordValidator }
    );
    this.activateRoute.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }

  submit() {
    console.log(this.token);
    this.recaptchaV3Service
      .execute('importantAction')
      .subscribe((tocken: string) => {
        console.debug(`Token [${tocken}] generated`);
        this.resetPassowrdform.patchValue({ captcha: tocken });
        this.verify();
      });
  }
  verify() {
    this.resetPassowrdform.patchValue({ token: this.token });
    delete this.resetPassowrdform.value.confirmPassword;
    console.log(this.resetPassowrdform.value);
    this.httpservice.resetPassword(this.resetPassowrdform.value).subscribe({
      next: (res: any) => {
        console.log(res);
        console.log('reset');
      },
      error: (err: any) => {
        console.log(err);
        console.log('err');
      },
    });
  }
}
