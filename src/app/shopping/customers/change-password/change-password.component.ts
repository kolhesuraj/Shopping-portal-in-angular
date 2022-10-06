import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { passwordValidator } from '../../services/password.Validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  submmited: boolean = false;
  updating: boolean = false;
  constructor(
    private fb: FormBuilder,
    private http: HttpServiceService,
    private toaster: HotToastService,
    private _matDialog: MatDialogRef<ChangePasswordComponent>
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group(
      {
        old_password: ['', [Validators.required]],
        new_password: ['', [Validators.required]],
        confirm_password: [''],
      },
      { validator: passwordValidator }
    );
  }

  get oldPassword() {
    return this.changePasswordForm.get('old_password');
  }
  get newPassword() {
    return this.changePasswordForm.get('new_password');
  }
  get ConfirmPassword() {
    return this.changePasswordForm.get('confirm_password');
  }

  savePassword() {
    if (this.changePasswordForm.valid) {
      delete this.changePasswordForm.value.confirm_password;
      this.updating = true;
      this.submmited = false;
      this.http
        .post('customers/auth/change-password', this.changePasswordForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.toaster.success('Password Updated!');
            this._matDialog.close();
          }
        });
    } else {
      this.submmited = true;
    }
  }
}
