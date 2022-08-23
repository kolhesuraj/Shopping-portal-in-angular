import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';
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
    // private ls: LoginService,
    private route: Router,
    private httpservice: HttpServiceService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emailControl: ['', [Validators.required, Validators.email]],
      passwordFormControl: ['', [Validators.required]],
    });
    // console.log(this.loginForm.value)
  }

  get emailControl() {
    return this.loginForm.get('emailControl');
  }
  get passwordFormControl() {
    return this.loginForm.get('passwordFormControl');
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
      // let varify = this.ls.login(
      //   this.emailControl?.value,
      //   this.passwordFormControl?.value
      // );
      // if (varify == true) {
      //   this.route.navigate(['/profile']);
      //   console.log('success');
      // } else {
      //   this.loginFaildMssage = true;
      //   this.massage = false;
      //   console.log('failed');
      // }
      const dataSent = {
        email: this.loginForm?.value.emailControl,
        password: this.loginForm?.value.passwordFormControl,
      };
      this.httpservice.login(dataSent).subscribe({
        next: (res: any) => {
          console.log(res);
          localStorage.setItem('LoginUser', res.token);
          localStorage.setItem('data', JSON.stringify(res));
          this.tocken = 1;
          if (res.user.isEmailVerified == true) {
            setTimeout(() => {
              this.route.navigate(['/profile']);
              this.tocken = 0;
            }, 1500);
          }else{
            this.route.navigate(['/auth/email-varify']);
          }
        },
        error: (err) => {
          console.log(err);
          Swal.fire(err.error.message);
          // alert(err.error.message)
        },
      });
    }
  }

  register() {
    this.route.navigate(['/auth/register']);
  }
}
