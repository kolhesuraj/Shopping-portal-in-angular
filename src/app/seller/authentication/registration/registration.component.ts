import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidator } from './password.Validator';
import Swal from 'sweetalert2';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  register!: FormGroup;
  data: any = [];
  tocken: number = 0;
  emailExist = false;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    // private ls: LoginService,
    // private http: HttpClient
    private httpService: HttpServiceService,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit(): void {
    this.register = this.fb.group(
      {
        name: ['', [Validators.required]],
        company: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        ConfirmPassword: [''],
        captcha: [''],
      },
      { validator: passwordValidator }
    );
    this.refreshCaptcha();
  }
  get Name() {
    return this.register.get('name');
  }
  get CompanyName() {
    return this.register.get('company');
  }
  get Email() {
    return this.register.get('email');
  }
  get Password() {
    return this.register.get('password');
  }
  get ConfirmPassword() {
    return this.register.get('ConfirmPassword');
  }
  submited = false;

  errorFromserver: any;
  registerLogin() {
    console.log(this.register.value);
    if (this.register.valid) {
      this.submited = false;
      const dataSent = this.register.value;
      delete dataSent.ConfirmPassword;
      this.httpService.post('auth/register', dataSent).subscribe({
        next: (res: any) => {
          console.log(res);
          this.httpService.sendVerrification(res.token).subscribe({
            next: (res: any) => {
              console.log(res);
              Swal.fire(
                'registerd Successfully',
                'please check email to verify'
              );
              setTimeout(() => {
                this.tocken = 0;
                this.route.navigate(['/login']);
              }, 1500);
            },
            error: (err) => {
              // console.log(err);
              this.errorFromserver = err.error.message;
            },
          });

          // this.httpService.register(dataSent).subscribe({
          //   next: (res) => {
          //     // localStorage.setItem('registrationToken', res.token);
          //     // console.log(res);
          //     // this.httpService.sendVerrification(res.token).subscribe({
          //     //   next: (res: any) => {
          //     //     // console.log(res);
          //     //     Swal.fire(
          //     //       'registerd Successfully',
          //     //       'please check email to verify'
          //     //     );
          //       },
          //       error: (err) => {
          //         // console.log(err);
          //         this.errorFromserver = err.error.message;
          //       },
          //     });

          // console.log(res);
          // localStorage.setItem('registrationToken', JSON.stringify(res));
          // this.tocken = 1;
          // setTimeout(() => {
          //   this.tocken = 0;
          //   this.route.navigate(['/login']);
          // }, 1500);
        },
        error: (err) => {
          // console.log(err);
          this.errorFromserver = err.error.message;
        },
      });
    } else {
      this.submited = true;
    }
  }
  reset() {
    this.errorFromserver = '';
    this.submited = false;
  }

  refreshCaptcha() {
    this.recaptchaV3Service
      .execute('importantAction')
      .subscribe((token: string) => {
        console.debug(`Token [${token}] generated`);
        this.register.patchValue({ captcha: token });
      });
  }
}

// registerLogin() {
//   if (this.register.valid) {
//     if (this.ls.emailValid(this.Email?.value)) {
//       this.emailExist = true;
//     } else {
//       const temp = this.ls.getData();
//       if (temp?.length > 0) {
//         this.data = temp;
//       }
//       // console.log(this.data);
//       // console.log(typeof this.register.value);
//       // let finalData = this.register.value;
//       // console.log(typeof finalData)
//       // finalData.splice(-1, 1);
//       // let finalData = {
//       //   FirstName: this.FirstName?.value,
//       //   LastName: this.LastName?.value,
//       //   CompanyName: this.CompanyName?.value,
//       //   Email: this.Email?.value,
//       //   Password: this.Password?.value,
//       // };
//       let finalData = this.register.value;
//       delete finalData.ConfirmPassword;
//       this.data.push(finalData);
//       // console.log(this.data);
//       localStorage.setItem('registeredUser', JSON.stringify(this.data));
//       this.data = [];
//       this.tocken = 1;
//       setTimeout(() => {
//         this.tocken = 0;
//         this.route.navigate(['/auth/login']);
//       }, 1500);
//     }
//   } else {
//     this.submited = true;
//   }
// }
