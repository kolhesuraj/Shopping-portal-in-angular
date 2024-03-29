import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { Router } from '@angular/router';
import { UpdateOrgComponent } from '../update-org/update-org.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import Swal from 'sweetalert2';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { debounceTime, map, Observable, startWith } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
})
export class OrganizationComponent implements OnInit {
  searchForm!: FormGroup;
  constructor(
    private httpService: HttpServiceService,
    private _dialog: MatDialog,
    private route: Router,
    private authService: SocialAuthService,
    private toaster: HotToastService,
    private fb: FormBuilder
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
  suggestion: string[] = [''];
  filteredOptions: Observable<string[]> | undefined;
  flag = 0;
  todayDate: boolean | undefined;

  rolearray = ['All Employes', 'user', 'admin'];
  sortarray = ['name', 'email', 'ceatedAt', 'updated'];
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      myControl: [''],
    });

    /* This is a rxjs operator. It is used to filter the options in the search input. */
    this.filteredOptions = this.searchForm.get('myControl')?.valueChanges.pipe(
      startWith(' '),
      map((value: string | null) => this._filter(value || ''))
    );
    this.searchForm
      .get('myControl')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((data) => {
        this.getUsers();
      });
  }
   
  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.suggestion.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  /**
   * It gets the profile of the logged in user
   */
  getProfile() {
    this.httpService.get('auth/self').subscribe({
      next: (orgData: any) => {
        // console.log(orgData);
        this.orgName = orgData._org.name;
        this.orgEmail = orgData._org.email;
        this.loginRole = orgData.role;
        this.getOrgName();
      },
    });
  }
  getOrgName() {
    var splitted = this.orgName.split(' ', 3);
    // console.log(splitted);
    if (splitted.length > 1) {
      this.org = splitted[0].slice(0, 1).toUpperCase();
      this.org += splitted[1].slice(0, 1).toUpperCase();
      // console.log(this.org);
    } else {
      this.org = this.orgName.slice(0, 2).toUpperCase();
    }
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

  /**
   * It gets the users from the API and sets the result and list variables
   */
  getUsers() {
    let data: any;
    if (this.search == '' || this.search == ' ') {
      data = this.setdata();
    } else {
      data = this.setdata();
      data = `${data}&name=${this.search}`;
    }
    this.httpService.get(`users?${data}`).subscribe({
      next: (res: any) => {
        this.result = res.results;
        this.list = res;
        if (this.flag == 0) {
          this.getSuggetion();
          this.flag = 1;
        }
      },
    });
  }

  /**
   * It gets the list of users from the API and adds them to the suggestion array
   */
  getSuggetion() {
    const data = `limit=${this.list.totalResults}`;
    this.httpService.get(`users?${data}`).subscribe({
      next: (res: any) => {
        res.results.forEach((element: any) => {
          if (this.suggestion.includes(element.name)) {
          } else {
            this.suggestion.push(element.name);
          }
        });
      },
    });
  }

  logout() {
    localStorage.removeItem('LoginUser');
    this.route.navigate(['/seller/auth']);
    this.authService.signOut();
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

  /**
   * This function is used to update the organization details
   */
  updateOrg() {
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
  }

  /**
   * The above function is used to delete the user.
   * @param {any} id - any - The id of the user to delete.
   */
  deleteUser(id: any) {
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
        this.httpService.delete(`users/${id}`).subscribe({
          next: (res: any) => {
            this.toaster.success('User Deleted !');
            this.getUsers();
          },
        });
      }
    });
  }

  updateUser(id: any, name: string, email: String) {
    // console.log(id, name, email);

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
    this.limit = parseInt(event.target.value);
    this.pagenumber = 1;
    this.getUsers();
  }

  /**
   * If the sortBy variable is equal to the by variable, then set sortBy to 'role', otherwise set sortBy
   * to by
   * @param {string} by - string - the column name to sort by
   */
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

  /**
   * If the value is not empty, then set the search variable to the value, otherwise set the search
   * variable to an empty string
   * @param {string} value - string - The value of the search input.
   */
  searchinput(value: string) {
    if (value) {
      this.search = value;
      this.getUsers();
    } else {
      this.search = '';
    }
  }

  editRole(id: any) {
    Swal.fire({
      title: 'Edit Role',
      showCancelButton: true,
      confirmButtonText: 'update',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      // input: 'text',
      html: '<h4>Role must be Admin or User</h4>, <input class="form-control w-50 m-auto mb-1" type="text" id="role">',
      preConfirm: () => {
        return (document.getElementById('role') as HTMLInputElement).value;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const roleselect = result.value?.toLocaleLowerCase();
        console.log(result);
        if (roleselect == 'admin' || roleselect == 'user') {
          const roleget = { role: roleselect };
          this.httpService.patch(`users/role/${id}`, roleget).subscribe({
            next: (res: any) => {
              Swal.fire('user role changed successfully');
              this.getUsers();
            },
          });
        } else {
          Swal.fire('role must be admin or user');
        }
      }
    });
  }
}
