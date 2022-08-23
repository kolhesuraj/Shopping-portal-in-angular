import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidator } from 'src/app/authentication/registration/password.Validator';
import { HttpServiceService } from 'src/app/services/http-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
register!: FormGroup;
  data: any = [];
  tocken: number = 0;
  emailExist = false;
  constructor(
     private fb: FormBuilder,
    private route: Router,
    private httpService: HttpServiceService
  ) {}

  ngOnInit(): void {
    this.register = this.fb.group(
      {
        Name: ['', [Validators.required]],
        Role: ['', [Validators.required]],
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
  get Role() {
    return this.register.get('Role');
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
  errorFromserver: any;
  addUser() {
    if (this.register.valid) {
      this.submited = false;
       const dataSent = {
        name: this.register?.value.Name,
        email: this.register?.value.Email,
        role: this.register?.value.Role,
        password: this.register?.value.Password,
      };
      this.httpService.addOrgUser(dataSent).subscribe({
        next: (res) => {
          localStorage.setItem('registrationToken', res.token);
          console.log(res);
          Swal.fire('registerd Successfully');
          this.register.reset();
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
    this.register.reset();
  }
   goback() {
    this.route.navigate(['profile/org']);
  }

}
