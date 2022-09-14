import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { passwordValidator } from 'src/app/authentication/registration/password.Validator';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';
import { EditUserComponent } from '../organization/edit-user/edit-user.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePassword!: FormGroup;
  Message!: boolean;
  token: any;
  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService,
    private _dialogRef: MatDialogRef<EditUserComponent>
  ) {}

  ngOnInit(): void {
    this.changePassword = this.fb.group(
      {
        old_password: ['', [Validators.required]],
        new_password: ['', [Validators.required]],
      },
      { validator: passwordValidator }
    );
  }
  get Password() {
    return this.changePassword.get('old_password');
  }
  get ConfirmPassword() {
    return this.changePassword.get('new_password');
  }

  submit() {
    if (this.changePassword.valid) {
      this.httpService
        .post('users/auth/change-password', this.changePassword.value)
        .subscribe({
          next: (res: any) => {
            console.log(res);
            Swal.fire('password changed successfully');
            // console.log('Response');
            this._dialogRef.close();
          },
          error: (err: any) => {
            console.log(err);
            console.log('error');
          },
        });
      // this.httpService.changePassword(this.changePassword.value).subscribe({
      //   next: (res: any) => {
      //     console.log(res);
      //     Swal.fire('changed');
      //     console.log('Response');
      //     this._dialogRef.close();
      //   },
      //   error: (err: any) => {
      //     console.log(err);
      //     console.log('error');
      //   },
      // });
    } else {
      this.Message = true;
    }
  }
}
