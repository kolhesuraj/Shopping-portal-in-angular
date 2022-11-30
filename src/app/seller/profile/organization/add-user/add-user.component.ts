import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from 'src/app/services/password.Validator';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  register!: FormGroup;
  data: any = [];
  tocken: number = 0;
  updating: boolean = false;
  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService
  ) {}

  ngOnInit(): void {
    this.register = this.fb.group(
      {
        name: ['', [Validators.required]],
        role: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        ConfirmPassword: [''],
      },
      { validator: passwordValidator }
    );
  }
  get Name() {
    return this.register.get('name');
  }
  get Role() {
    return this.register.get('role');
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
  addUser() {
    if (this.register.valid) {
      this.submited = false;
      this.updating = true;
      // const data = {
      //   name: this.register?.value.Name,
      //   email: this.register?.value.Email,
      //   role: this.register?.value.Role,
      //   password: this.register?.value.Password,
      // };
      delete this.register.value.ConfirmPassword;
      this.httpService.post('users', this.register.value).subscribe({
        next: (res) => {
          Swal.fire('User Registerd Successfully');
          this.register.reset();
        }
      });
      // this.httpService.addOrgUser(dataSent).subscribe({
      //   next: (res) => {
      //     localStorage.setItem('registrationToken', res.token);
      //     console.log(res);
      //     Swal.fire('registerd Successfully');
      //     this.register.reset();
      //   },
      //   error: (err) => {
      //     console.log(err);
      //   },
      // });
    } else {
      this.submited = true;
      this.updating = false;
    }
  }
  reset() {
    this.errorFromserver = '';
    this.submited = false;
    this.register.reset();
  }
}
