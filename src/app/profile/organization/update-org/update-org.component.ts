import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
interface dialogdata {
  name: string;
  email: string;
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: dialogdata,
    private fb: FormBuilder,
    private ls: LoginService,
    private _dialogRef: MatDialogRef<UpdateOrgComponent>,
    private httpservice: HttpServiceService
  ) {}

  ngOnInit(): void {
    // console.log(this.data);
    this.editForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
    });
    // console.log(this.Email);
    this.editForm.setValue({
      email: this.data.email,
      name: this.data.name,
    });
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
      console.log(this.editForm.value);
      const data = {
        email: this.editForm.value.email,
        name: this.editForm.value.name,
      };
      this.httpservice.updateOrg(data).subscribe({
        next: (res: any) => {
          // console.log(res);
          Swal.fire('organization details updated');
          this._dialogRef.close();
        },
        error: (err: any) => {
          console.log(err);
          Swal.fire(err.error.message);
        },
      });
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