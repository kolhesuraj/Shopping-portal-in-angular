import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-update-org',
  templateUrl: './update-org.component.html',
  styleUrls: ['./update-org.component.css'],
})
export class UpdateOrgComponent implements OnInit {
  editForm!: FormGroup;
  _Email!: string;
  Company_Name!: string;
  Email!: string;
  First_Name!: string;
  // index:number;

  constructor(
    private fb: FormBuilder,
    private ls: LoginService,
    private _dialogRef: MatDialogRef<UpdateOrgComponent>
  ) {
    let temp: any = localStorage.getItem('data');
    const data = JSON.parse(temp);
    this.Email = data.user._org.email;
    this.Company_Name = data.user._org.name;
    console.log(this.First_Name);
  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      CompanyName: ['', [Validators.required]],
    });
    this.editForm.setValue({
      email: this.Email,
      CompanyName: this.Company_Name,
    });
  }
  get email() {
    return this.editForm.get('email');
  }
  get CompanyName() {
    return this.editForm.get('CompanyName');
  }

  submited = false;
  update() {
    console.log(this.editForm.value);
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