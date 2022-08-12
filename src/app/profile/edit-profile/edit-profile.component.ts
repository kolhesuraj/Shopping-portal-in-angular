import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { HomePageComponent } from '../home-page/home-page.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  editForm!: FormGroup;
  _Email!: string;
  Company_Name!: string;
  Last_Name!: string;
  First_Name!: string;
  index:number;

  constructor(private fb: FormBuilder, private ls: LoginService, private _dialogRef: MatDialogRef<EditProfileComponent>) {
    let temp: any = localStorage.getItem('LoginUser');
    const data = JSON.parse(temp);
    this.index = this.findData(data.Email);
    // console.log(this.index)
    this.First_Name = data.FirstName;
    this.Last_Name = data.LastName;
    this.Company_Name = data.CompanyName;
    // this._Email = data.Email;
    console.log(this.First_Name);
  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      CompanyName: ['', [Validators.required]],
      // Email: ['', [Validators.required, Validators.email]],
    });
    this.editForm.setValue({
      FirstName: this.First_Name,
      LastName: this.Last_Name,
      CompanyName: this.Company_Name,
      //  Email : this._Email,
    });
  }
  get FirstName() {
    return this.editForm.get('FirstName');
  }
  get LastName() {
    return this.editForm.get('LastName');
  }
  get CompanyName() {
    return this.editForm.get('CompanyName');
  }
  // get Email() {
  //   return this.editForm.get('Email');
  // }
  submited = false;
  // emailExist = false;
  update() {
    if (this.editForm.valid && this.editForm.dirty) {
      // if (this.ls.emailValid(this.Email?.value)) {
      //   this.emailExist = true;
      // }
      this.submited = false;
      // console.log('dirty');
      let temp = this.ls.getData();
      temp[this.index].FirstName = this.FirstName?.value;
      temp[this.index].LastName = this.LastName?.value;
      temp[this.index].CompanyName = this.CompanyName?.value;
      localStorage.setItem('registeredUser', JSON.stringify(temp)); 

      let loginT:any = localStorage.getItem('LoginUser');
      let loginTemp = JSON.parse(loginT);
      loginTemp.FirstName = this.FirstName?.value;
      loginTemp.LastName = this.LastName?.value;
      loginTemp.CompanyName = this.CompanyName?.value;
      localStorage.setItem('LoginUser', JSON.stringify(loginTemp));
      // this.ls.setLogin(temp[this.index].Email);
      this.ls.setLogin(loginTemp);
      
      this._dialogRef.close();

    } else if (this.editForm.invalid) {
      this.submited = true;
    }
  }
  findData(email: any): number {
    let temp = this.ls.getData();
    let index : number = -1;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].Email == email) {
        index = i;
      }
    }
    return index;
  }
}
