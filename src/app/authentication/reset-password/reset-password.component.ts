import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';
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
      },
      { validator: passwordValidator }
    );
    this.activateRoute.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }

  submit() {
    if (this.resetPassowrdform.valid) {
      console.log(this.token);
      delete this.resetPassowrdform.value.confirmPassword;
      // console.log(this.resetPassowrdform.value);
      this.httpservice
        .post(
          `auth/reset-password?token=${this.token}`,
          this.resetPassowrdform.value
        )
        .subscribe({
          next: (res: any) => {
            console.log(res);
            console.log('reset');
            Swal.fire('Password reset successfully');
            this.route.navigate(['./auth']);
          },
          error: (err: any) => {
            console.log(err);
            console.log('err');
          },
        });
      // this.httpservice
      //   .resetPassword(this.resetPassowrdform.value, this.token)
      //   .subscribe({
      //     next: (res: any) => {
      //       console.log(res);
      //       console.log('reset');
      //       Swal.fire('Password reset successfully');
      //       this.route.navigate(['./auth']);
      //     },
      //     error: (err: any) => {
      //       console.log(err);
      //       console.log('err');
      //     },
      //   });
    } else {
      this.Message = true;
    }
  }
  get Password() {
    return this.resetPassowrdform.get('password');
  }
  get ConfirmPassword() {
    return this.resetPassowrdform.get('confirmPassword');
  }
}
