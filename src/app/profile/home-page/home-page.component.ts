import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { LoginService } from 'src/app/services/login.service';
import { AddUserComponent } from '../organization/add-user/add-user.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(
    // private _dialog: MatDialog,
    private ls: LoginService,
    private httpService: HttpServiceService,
    private route: Router,
    private _dialog: MatDialog,
  ) {}

  FirstName!: string;
  LastName!: string;
  CompanyName!: string;
  Email!: string;
  Role!: string;
  ngOnInit(): void {
    this.ls.loadData();
    this.setData();
    let data: any;
    this.ls.LogIndata.subscribe({
      next: (result: any) => {
        data = result;
        this.FirstName = data.name;
        this.Email = data.email;
        setTimeout(() => {
          this.CompanyName = data._org.name;
        }, 500);
        this.Role = data.role;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  logout() {
    localStorage.removeItem('LoginUser');
    this.route.navigate(['/auth']);
  }

  org() {
    this.route.navigate(['profile/org']);
  }

  // editProfile() {
  //   const dialogRef = this._dialog.open(EditProfileComponent, {
  //     width: '37%',
  //     backdropClass: 'dialog-bg-trans',
  //   });
  //   this.setData();
  // }
  // setData(){
  //   // console.log("refresh");

  //       // console.log(data);
  //       let data:any;
  //       this.ls.LogIndata.subscribe((result :any)=>{
  //         data = result;
  //         // console.log(result)
  //         // console.log(data);

  //         this.FirstName = data.FirstName;
  //         this.LastName = data.LastName;
  //         this.CompanyName = data.CompanyName;
  //         this.Email = data.Email;
  //       })

  // }
  setData() {
    this.httpService.profileView().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.ls.LogIndata.next(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  addProfile() {
    const dialogRef = this._dialog.open(AddUserComponent, {
      width: '50%',
      // backdropClass: 'dialog-bg-trans',
    });
  }
}
