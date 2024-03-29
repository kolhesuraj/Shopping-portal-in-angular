import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  data: any = {};
  loginrole: any;
  constructor(
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
      }
    });
  }

  ngOnInit(): void {}
  logout() {
    this.authService.signOut();
    localStorage.removeItem('LoginUser');
    this.route.navigate(['/seller/auth']);
  }

  sendverificationemail() {
    // let token = this.ls.gettoken();
    // console.log(token);
    this.httpService
      .post('auth/send-verification-email?captcha=false', null)
      .subscribe({
        next: (res: any) => {
          // console.log(res);
          Swal.fire('Email send successfully', 'please check email and verify');
        }
      });
  }

 
  setData() {
    this.httpService.get('auth/self').subscribe({
      next: (res: any) => {
        // console.log(res);
        this.ls.LogIndata.next(res);
      }
    });

  }

  changePassword() {
    const dialogRef = this._dialog.open(ChangePasswordComponent, {
      width: '35%',
    });
  }
}
