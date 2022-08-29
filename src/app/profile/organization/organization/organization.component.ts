import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { LoginService } from 'src/app/services/login.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { Router } from '@angular/router';
import { UpdateOrgComponent } from '../update-org/update-org.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import Swal from 'sweetalert2';

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
  loginRole: any;
  list: any;
  pagenumber: number = 1;
  limit: number = 10;
  sortBy: string = 'role';
  Role: string = 'all';
  search!: string;

  rolearray = ['all', 'user', 'admin'];
  sortarray = ['name', 'email', 'ceatedAt', 'updated'];
  ngOnInit(): void {
    this.profile();
  }
  profile() {
    this.getProfile();
    this.getUsers();
  }

  getProfile() {
    this.httpService.profileView().subscribe({
      next: (orgData: any) => {
        console.log(orgData);
        this.orgName = orgData._org.name;
        this.orgEmail = orgData._org.email;
        this.loginRole = orgData.role;
        this.org = this.orgName.slice(0, 2).toUpperCase();
      },
    });
  }

  getUsers() {
    this.httpService
      .orgUsers(
        this.pagenumber,
        this.limit,
        this.sortBy,
        this.Role,
        this.search
      )
      .subscribe({
        next: (res: any) => {
          // console.log(res);
          this.list = res;
        },
        error: (err: any) => {
          Swal.fire(err);
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
      this.getProfile();
    });
  }

  deleteUser(id: any) {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpService.deleteUser(id).subscribe({
          next: (res: any) => {
            // console.log(res);
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            this.getUsers();
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
      }
    });
  }

  updateUser(id: any, name: string, email: String) {
    console.log(id, name, email);
    const dialogRef = this._dialog.open(EditUserComponent, {
      width: '35%',
      data: {
        id: id,
        name: name,
        email: email,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }

  gotoPage(number: number) {
    if (number <= this.list.totalPages) {
      this.pagenumber = number;
      this.getUsers();
    }
  }

  pagelimit(event: any) {
    this.limit = parseInt((event.target as HTMLSelectElement).value);
    this.pagenumber = 1;
    this.getUsers();
  }

  // sortby(event: any) {
  //   this.sortBy = (event.target as HTMLSelectElement).value;
  //   this.getUsers();
  // }

  sortby(by: string) {
    this.sortBy = by;
    this.pagenumber = 1;
    this.getUsers();
  }

  role(event: any) {
    this.Role = (event.target as HTMLSelectElement).value;
    this.pagenumber = 1;
    this.getUsers();
  }

  searchinput(value: string) {
    // console.log(value);
    this.search = value;
    this.getUsers();
  }

  editRole(id: any) {
    if (this.loginRole == 'admin') {
      Swal.fire({
        title: 'Edit Role',
        html: '<h1>Role must be Admin or User</h1> ,<input type="text" id="role">',
        preConfirm: () => {
          return (document.getElementById('role') as HTMLInputElement).value;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          if (result.value == 'admin' || result.value == 'user') {
            console.log(result);
            const roleget = { role: result.value };
            console.log(id, roleget);
            this.httpService.updateRole(roleget, id).subscribe({
              next: (res: any) => {
                console.log(res);
                this.getUsers();
              },
              error: (err: any) => {
                console.log(err);
              },
            });
          } else {
            Swal.fire('role must be admin or user')
          }
        }
      });
    } else {
      Swal.fire("users cann't change role");
    }
  }
}
