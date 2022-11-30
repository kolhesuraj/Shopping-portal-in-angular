import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  Message: boolean = false;
  updating: boolean = false;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private recaptchaV3Service: ReCaptchaV3Service,
    private httpservice: HttpServiceService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      captcha: [''],
    });
  }
  get Email() {
    return this.forgotPasswordForm.get('email');
  }
  submit() {
    if (this.forgotPasswordForm.valid) {
      this.updating = true;
      this.recaptchaV3Service
        .execute('importantAction')
        .subscribe((token: string) => {
          this.forgotPasswordForm.patchValue({ captcha: token });
          this.sendEmail();
        });
    } else {
      this.Message = true;
    }
  }

  sendEmail() {
    if (this.forgotPasswordForm.valid) {
      this.httpservice
        .post('auth/forgot-password', this.forgotPasswordForm.value)
        .subscribe({
          next: (res: any) => {
            Swal.fire('Link send vai Email', 'please check email');
            this.forgotPasswordForm.reset();
          }
        });
    }
    // this.httpservice.forgotPassword(this.forgotPasswordForm.value).subscribe({
    //   next: (res: any) => {
    //     // console.log(res);
    //     // console.log('emailsend');
    //     Swal.fire('Link send vai Email', 'please check email');
    //     this.forgotPasswordForm.reset();
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //     console.log('error');
    //   },
    // });
  }

  goback() {
    this.route.navigate(['/seller/auth/login']);
  }
}
