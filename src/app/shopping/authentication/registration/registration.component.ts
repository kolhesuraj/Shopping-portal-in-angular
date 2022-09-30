import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidator } from './password.Validator';
import Swal from 'sweetalert2';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Token } from '@angular/compiler';

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
  captcha!: string;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    // private ls: LoginService,
    // private http: HttpClient
    private httpService: HttpServiceService,
    private recaptchaV3Service: ReCaptchaV3Service
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
    this.register = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        ConfirmPassword: ['', [Validators.required]],
        captcha: ['', Validators.required],
        addresses: this.fb.group({
          street: ['', [Validators.required]],
          addressLine2: [''],
          city: ['', [Validators.required]],
          state: ['', [Validators.required]],
          pin: [
            '',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(6),
            ],
          ],
        }),
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
  get Address() {
    return this.register.get('addresses') as FormGroup;
  }
  get Street() {
    return this.Address.get('street');
  }
  get AddressLine2() {
    return this.Address.get('addressLine2');
  }
  get City() {
    return this.Address.get('city');
  }
  get State() {
    return this.Address.get('state');
  }
  get Pin() {
    return this.Address.get('pin');
  }
  submited = false;

  errorFromserver: any;
  registerLogin() {
    console.log(this.register.value);
    this.register.patchValue({ captcha: this.captcha });

    if (this.register.valid) {
      this.submited = false;
      const dataSent = this.register.value;
      delete dataSent.ConfirmPassword;
      this.httpService.post('shop/auth/register', dataSent).subscribe({
        next: (res: any) => {
          console.log(res);
          this.tocken = 1;
          setTimeout(() => {
            this.tocken = 0;
            this.route.navigate(['/shop/auth/login']);
          }, 1500);
        }
      });
    } else {
      this.submited = true;
    }
  }
  reset() {
    this.refreshCaptcha();
    this.errorFromserver = '';
    this.submited = false;
  }
}
