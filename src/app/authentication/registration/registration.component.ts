import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { passwordValidator } from './password.Validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  register!: FormGroup;
  data: any = [];
  tocken!: number;
  emailExist = false;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private ls: LoginService
  ) {}

  ngOnInit(): void {
    this.register = this.fb.group(
      {
        FirstName: ['', [Validators.required]],
        LastName: ['', [Validators.required]],
        CompanyName: ['', [Validators.required]],
        Email: ['', [Validators.required, Validators.email]],
        Password: ['', [Validators.required, Validators.minLength(6)]],
        ConfirmPassword: [''],
      },
      { validator: passwordValidator }
    );
  }
  get FirstName() {
    return this.register.get('FirstName');
  }
  get LastName() {
    return this.register.get('LastName');
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
  
  registerLogin() {
    if (this.register.valid) {
      if (this.ls.emailValid(this.Email?.value)) {
        this.emailExist = true;
      } else {
        const temp = this.ls.getData();
        if (temp?.length > 0) {
          this.data = temp;
        }
        // console.log(this.data);
        // console.log(typeof this.register.value);
        // let finalData = this.register.value;
        // console.log(typeof finalData)
        // finalData.splice(-1, 1);
        // let finalData = {
        //   FirstName: this.FirstName?.value,
        //   LastName: this.LastName?.value,
        //   CompanyName: this.CompanyName?.value,
        //   Email: this.Email?.value,
        //   Password: this.Password?.value,
        // };
        let finalData = this.register.value;
        delete finalData.ConfirmPassword;
        this.data.push(finalData);
        // console.log(this.data);
        localStorage.setItem('registeredUser', JSON.stringify(this.data));
        this.data = [];
        this.tocken = 1;
        setTimeout(() => {
          this.tocken = 0;
          this.route.navigate(['/login']);
        }, 1500);
      }
    } else {
      this.submited = true;
    }
  }
  signIn() {
    this.route.navigate(['/login']);
  }
}
