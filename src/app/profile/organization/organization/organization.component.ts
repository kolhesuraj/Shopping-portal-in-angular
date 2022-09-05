import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { Router } from '@angular/router';
import { UpdateOrgComponent } from '../update-org/update-org.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import Swal from 'sweetalert2';
import { LowerCasePipe } from '@angular/common';
import { HttpServiceService } from 'src/app/services/http/http-service.service';

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
  ) {
    this.getProfile();
    this.getUsers();
  }

  orgName!: string;
  orgEmail!: string;
  org!: string;
  loginRole: any;
  list: any = {};
  result!: any[];
  pagenumber: number = 1;
  limit: number = 10;
  sortBy: string = 'role';
  Role: string = 'All Employes';
  search: string = '';

  rolearray = ['All Employes', 'user', 'admin'];
  sortarray = ['name', 'email', 'ceatedAt', 'updated'];
  ngOnInit(): void {}

  getProfile() {
    this.httpService.profileView().subscribe({
      next: (orgData: any) => {
        // console.log(orgData);
        this.orgName = orgData._org.name;
        this.orgEmail = orgData._org.email;
        this.loginRole = orgData.role;
        this.org = this.orgName.slice(0, 2).toUpperCase();
      },
    });
  }
  setdata() {
    let data;
    if (this.Role == 'All Employes') {
      data = `page=${this.pagenumber}&limit=${this.limit}&sortBy=${this.sortBy}`;
    } else {
      data = `page=${this.pagenumber}&limit=${this.limit}&sortBy=${this.sortBy}&role=${this.Role}`;
    }
    return data;
  }
  getUsers() {
    let data: any;
    if (this.search == '') {
      data = this.setdata();
    } else {
      data = this.setdata();
      data = `${data}&name=${this.search}`;
    }
    this.httpService.orgUsers(data).subscribe({
      next: (res: any) => {
        console.log(res);
        this.result = res.results;
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
    dialogRef.afterOpened().subscribe(() => {
      const first = document.querySelector('.navbar') as HTMLElement;
      first.classList.remove('sticky-top');
      const footer = document.querySelector('#footer') as HTMLElement;
      footer.classList.remove('fixed-bottom');
    });

    dialogRef.afterClosed().subscribe(() => {
      const first = document.querySelector('.navbar') as HTMLElement;
      first.classList.add('sticky-top');
      const footer = document.querySelector('#footer') as HTMLElement;
      footer.classList.add('fixed-bottom');
      this.getUsers();
    });
  }

  updateOrg() {
    if (this.loginRole == 'admin') {
      const dialogRef = this._dialog.open(UpdateOrgComponent, {
        width: '31%',
        data: {
          name: this.orgName,
          email: this.orgEmail,
        },
      });
      dialogRef.afterClosed().subscribe(() => {
        this.getProfile();
      });
    } else {
      Swal.fire("user cann't change company credintial");
    }
  }

  deleteUser(id: any) {
    // console.log(id);
    if (this.loginRole == 'admin') {
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
    } else {
      Swal.fire("user cann't delet login");
    }
  }

  updateUser(id: any, name: string, email: String) {
    // console.log(id, name, email);
    if (this.loginRole == 'admin') {
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
    } else {
      Swal.fire("users cann't update user");
    }
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
    if (this.sortBy == by) {
      this.sortBy = 'role';
    } else {
      this.sortBy = by;
    }
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
    if (value) {
      this.search = value;
    } else {
      this.search = '';
    }
    this.getUsers();
  }

  editRole(id: any) {
    if (this.loginRole == 'admin') {
      Swal.fire({
        title: 'Edit Role',
        showCancelButton: true,
        confirmButtonText: 'update',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        html: '<h4>Role must be Admin or User</h4>, <input class="form-control w-50 m-auto mb-1" type="text" id="role">',
        preConfirm: () => {
          return (document.getElementById('role') as HTMLInputElement).value;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const roleselect = result.value?.toLowerCase();
          if (roleselect == 'admin' || roleselect == 'user') {
            // console.log(result);
            const roleget = { role: roleselect };
            // console.log(id, roleget);
            this.httpService.updateRole(roleget, id).subscribe({
              next: (res: any) => {
                // console.log(res);
                this.getUsers();
              },
              error: (err: any) => {
                console.log(err);
              },
            });
          } else {
            Swal.fire('role must be admin or user');
          }
        }
      });
    } else {
      Swal.fire("users cann't change role");
    }
  }
}
