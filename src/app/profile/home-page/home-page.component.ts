import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { AddUserComponent } from '../organization/add-user/add-user.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  data: any = {};
  loginrole: any;
  constructor(
    // private _dialog: MatDialog,
    private ls: LoginService,
    private httpService: HttpServiceService,
    private route: Router,
    private _dialog: MatDialog,
    private authService: SocialAuthService
  ) {
    this.ls.loadData();
    this.setData();
    this.ls.LogIndata.subscribe({
      next: (result: any) => {
        // console.log(result);
        this.data = result;
        this.loginrole = result.role;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {}
  logout() {
    this.authService.signOut();
    localStorage.removeItem('LoginUser');
    this.route.navigate(['/auth']);
  }

  sendverificationemail() {
    let token = this.ls.gettoken();
    console.log(token);
    this.httpService
      .post('auth/send-verification-email?captcha=false', null)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire('Email send successfully', 'please check email and verify');
        },
        error: (err: any) => {
          console.log(err);
             Swal.fire({
               icon: 'error',
               title: 'Oops... Email send Failed',
               text: `Something went wrong! ${err}`,
             });
        },
      });
    // this.httpService.sendVerrification(token).subscribe({
    //   next: (res: any) => {
    //     console.log(res);
    //     Swal.fire('Email send successfully', 'please check email and verify');
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //     Swal.fire('Email send failed');
    //   },
    // });
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
    this.httpService.get('auth/self').subscribe({
      next: (res: any) => {
        // console.log(res);
        this.ls.LogIndata.next(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
    // this.httpService.profileView().subscribe({
    //   next: (res: any) => {
    //     // console.log(res);
    //     this.ls.LogIndata.next(res);
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //   },
    // });
  }

  changePassword() {
    const dialogRef = this._dialog.open(ChangePasswordComponent, {
      width: '35%',
    });
  }
}
