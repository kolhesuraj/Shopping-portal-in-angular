import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { LoginService } from 'src/app/services/login.service';
import { AddUserComponent } from '../add-user/add-user.component';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UpdateOrgComponent } from '../update-org/update-org.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
})
export class OrganizationComponent implements OnInit {
  constructor(
    private httpService: HttpServiceService,
    private ls: LoginService,
    private _dialog: MatDialog,
    private route: Router,
  ) {}

  orgData: any;
  orgName!: string;
  orgEmail!: string;
  org!: string;
  list: any;
  pagenumber: number = 0;
  ngOnInit(): void {
    this.profile();
  }
  profile() {
    this.orgData = this.ls.orgProfile();
    console.log(this.orgData);
    this.orgName = this.orgData.user._org.name;
    this.orgEmail = this.orgData.user._org.email;
    this.org = this.orgName.slice(0, 2).toUpperCase();
    this.httpService.orgUsers(this.pagenumber).subscribe({
      next: (res: any) => {
        console.log(res);
        this.list = res;
      },
      error: (err: any) => {
        console.error();
      },
    });
  }
  logout() {
    localStorage.removeItem('LoginUser');
    this.route.navigate(['/auth']);
  }
  addProfile() {
    const dialogRef = this._dialog.open(AddUserComponent, {
      width: '50%',
    });
  }

  updateOrg() {
    const dialogRef = this._dialog.open(UpdateOrgComponent, {
      width: '30%',
    });
  }

  deleteUser(id: any) {
    console.log(id);
    this.httpService.deleteUser(id).subscribe({
      next: (res: any) => {
        console.log(res);
        swal.fire('user deleted successfully');
        this.profile();
      },
      error: (err: any) => {
        console.log(err);
        swal.fire('error from server');
      },
    });
  }
  updateUser(id: any) {
    console.log(id);
  }

  gotoPage(number: number) {
    this.pagenumber = number;
    this.profile();
  }
}
