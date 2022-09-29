import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';
import { passwordValidator } from '../../../services/password.Validator';
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
    private _dialogRef: MatDialogRef<EditUserComponent>,
    private toaster: HotToastService
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
            this.toaster.success('Password Updated');
            // console.log('Response');
            this._dialogRef.close();
          },
          error: (err: any) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Something went wrong! ${err}`,
            });
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
