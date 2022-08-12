import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder, private ls: LoginService , private route:Router) {}

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
  submit() {
    console.log(this.loginForm.value);
    if (
      this.emailControl?.value == '' &&
      this.passwordFormControl?.value == ''
    ) {
      this.massage = true;
      this.loginFaildMssage = false;
    }else{
      let varify = this.ls.login(this.emailControl?.value, this.passwordFormControl?.value);
      if(varify == true){
        this.route.navigate(['/profile']);
        console.log("success");
      }else{
        this.loginFaildMssage = true;
        this.massage = false;
        console.log("failed");
      }
    }
  }
  register(){
    this.route.navigate(['/register']);
  }
}
