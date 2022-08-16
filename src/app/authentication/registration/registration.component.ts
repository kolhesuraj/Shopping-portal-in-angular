import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchAll } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { LoginService } from 'src/app/services/login.service';
import { passwordValidator } from './password.Validator';
import Swal from 'sweetalert2'

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
    private httpService: HttpServiceService
  ) {}

  ngOnInit(): void {
    this.register = this.fb.group(
      {
        Name: ['', [Validators.required]],
        CompanyName: ['', [Validators.required]],
        Email: ['', [Validators.required, Validators.email]],
        Password: ['', [Validators.required, Validators.minLength(8)]],
        ConfirmPassword: [''],
      },
      { validator: passwordValidator }
    );
  }
  get Name() {
    return this.register.get('Name');
  }
  get CompanyName() {
    return this.register.get('CompanyName');
  }
  get Email() {
    return this.register.get('Email');
  }
  get Password() {
    return this.register.get('Password');
  }
  get ConfirmPassword() {
    return this.register.get('ConfirmPassword');
  }
  submited = false;
  // url = 'https://ngminds.herokuapp.com/auth/register?captcha=false';
  
  errorFromserver:any;
  registerLogin() {
    if (this.register.valid) {
      this.submited = false;
     const dataSent = {
       name: this.register?.value.Name,
       email: this.register?.value.Email,
       company: this.register?.value.CompanyName,
       password: this.register?.value.Password,
     };
      // this.http
      //   .post(
      //     this.url,
      //     dataSent
      //     // {
      //     // name: this.register?.value.Name,
      //     // email: this.register?.value.Email,
      //     // password: this.register?.value.Password,
      //     // company: this.register?.value.CompanyName,
      //     // }
      //   )

      this.httpService.register(dataSent).subscribe({
        next: (res) => {
          localStorage.setItem('registrationToken',res.token);
          // console.log(res);
          this.httpService.sendVerrification(res.token).subscribe({
            next: (res: any) => {
              // console.log(res);
              Swal.fire("registerd Successfully")
              this.route.navigate(['/auth/email-varify']);
            },
            error: (err) => {
              // console.log(err);
              this.errorFromserver = err.error.message;
            },
          });

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
  reset(){
    this.errorFromserver = '';
    this.submited = false;
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
  signIn() {
    this.route.navigate(['/auth/login']);
  }
}
