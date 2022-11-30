import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
interface dialogdata {
  email: string;
  name: string;
}

@Component({
  selector: 'app-update-org',
  templateUrl: './update-org.component.html',
  styleUrls: ['./update-org.component.css'],
})
export class UpdateOrgComponent implements OnInit {
  editForm!: FormGroup;
  Name!: string;
  Email!: string;
  updating: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: dialogdata,
    private fb: FormBuilder,
    private _dialogRef: MatDialogRef<UpdateOrgComponent>,
    private httpservice: HttpServiceService,
    private toaster: HotToastService
  ) {}

  ngOnInit(): void {
    // console.log(this.data);
    this.editForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
    });
    // console.log(this.Email);
    this.editForm.patchValue({ email: this.data.email, name: this.data.name });
  }
  get email() {
    return this.editForm.get('email');
  }
  get name() {
    return this.editForm.get('name');
  }

  submited = false;
  update() {
    if (this.editForm.valid) {
      this.updating = true;
      // console.log(this.editForm.value);
      this.httpservice.patch('users/org', this.editForm.value).subscribe({
        next: (res: any) => {
          // console.log(res);
          this.toaster.success('Organixzation Details Upadetd');
          this._dialogRef.close();
        },
      });
      // this.httpservice.updateOrg(data).subscribe({
      //   next: (res: any) => {
      //     // console.log(res);
      //     Swal.fire('organization details updated');
      //     this._dialogRef.close();
      //   },
      //   error: (err: any) => {
      //     console.log(err);
      //     Swal.fire(err.error.message);
      //   },
      // });
    }
  }
}

// emailExist = false;
// update() {
//   if (this.editForm.valid && this.editForm.dirty) {
//     // if (this.ls.emailValid(this.Email?.value)) {
//     //   this.emailExist = true;
//     // }
//     this.submited = false;
//     // console.log('dirty');
//     let temp = this.ls.getData();
//     temp[this.index].FirstName = this.FirstName?.value;
//     temp[this.index].LastName = this.LastName?.value;
//     temp[this.index].CompanyName = this.CompanyName?.value;
//     localStorage.setItem('registeredUser', JSON.stringify(temp));

//     let loginT:any = localStorage.getItem('LoginUser');
//     let loginTemp = JSON.parse(loginT);
//     loginTemp.FirstName = this.FirstName?.value;
//     loginTemp.LastName = this.LastName?.value;
//     loginTemp.CompanyName = this.CompanyName?.value;
//     localStorage.setItem('LoginUser', JSON.stringify(loginTemp));
//     // this.ls.setLogin(temp[this.index].Email);
//     this.ls.setLogin(loginTemp);

//     this._dialogRef.close();

//   } else if (this.editForm.invalid) {
//     this.submited = true;
//   }
// }
// findData(email: any): number {
//   let temp = this.ls.getData();
//   let index : number = -1;
//   for (let i = 0; i < temp.length; i++) {
//     if (temp[i].Email == email) {
//       index = i;
//     }
//   }
//   return index;
// }
