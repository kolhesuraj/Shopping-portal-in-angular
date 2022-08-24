import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { LoginService } from 'src/app/services/login.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { Router } from '@angular/router';
import { UpdateOrgComponent } from '../update-org/update-org.component';
import swal from 'sweetalert2';
import { EditUserComponent } from '../edit-user/edit-user.component';

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
    private route: Router
  ) {}

  orgName!: string;
  orgEmail!: string;
  org!: string;
  list: any;
  pagenumber: number = 0;
  limit: number = 10;
  ngOnInit(): void {
    this.profile();
  }
  profile() {
    this.httpService.profileView().subscribe({
      next: (orgData: any) => {
        console.log(orgData);
        this.orgName = orgData._org.name;
        this.orgEmail = orgData._org.email;
        this.org = this.orgName.slice(0, 2).toUpperCase();
      },
    });

    this.httpService.orgUsers(this.pagenumber,this.limit).subscribe({
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
      data: {
        name: this.orgName,
        email: this.orgEmail,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.profile();
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
  updateUser(id: any, name: string, email: String) {
    console.log(id, name, email);
    const dialogRef = this._dialog.open(EditUserComponent, {
      width: '30%',
      data: {
        id: id,
        name: name,
        email: email,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.profile();
    });
  }

  gotoPage(number: number) {
    if (number <= this.list.totalPages) {
      this.pagenumber = number;
      this.profile();
    }
  }
  pagelimit(event: any) {
    this.limit =parseInt( (event.target as HTMLSelectElement).value);
    this.profile();
  }
}
