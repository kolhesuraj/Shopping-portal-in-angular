import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';

interface dataform {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  editForm!: FormGroup;
  _Email!: string;
  Company_Name!: string;
  Email!: string;
  First_Name!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: dataform,
    private fb: FormBuilder,
    private _dialogRef: MatDialogRef<EditUserComponent>,
    private httpservice: HttpServiceService,
    private toaster: HotToastService
  ) {
    // console.log(data);
  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.data.name, [Validators.required]],
      email: [this.data.email, [Validators.required, Validators.email]],
    });
  }

  get name() {
    return this.editForm.get('name');
  }
  get email() {
    return this.editForm.get('email');
  }

  submited = false;
  save() {
    if (this.editForm.valid) {
      // console.log(this.editForm.value);
      this.httpservice
        .patch(`users/${this.data.id}`, this.editForm.value)
        .subscribe({
          next: (res: any) => {
            this.toaster.success('User Details Updated');
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
      // this.httpservice.updateUser(this.data.id, name, email).subscribe({
      //   next: (res: any) => {
      //     console.log(res);
      //     Swal.fire('user details updated successfully');
      //     this._dialogRef.close();
      //   },
      //   error: (err: any) => {
      //     console.log(err);
      //   },
      // });
    } else {
      this.submited = true;
    }
  }
}
