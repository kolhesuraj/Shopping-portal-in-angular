import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';
import { CustomersService } from '../../services/customers.service';
import { AddressActionComponent } from '../address-action/address-action.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile: any;
  addresses: any;
  constructor(
    private service: CustomersService,
    private http: HttpServiceService,
    private matDialog: MatDialog,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getProfile();
    this.getAddresses();
  }
  Logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/shop/products']);
  }
  getProfile() {
    this.http.get('shop/auth/self').subscribe({
      next: (res) => {
        console.log(res);
        this.profile = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAddresses() {
    this.http.get('customers/address').subscribe({
      next: (res) => {
        console.log(res);
        this.addresses = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  editProfile() {
    const _dialog = this.matDialog.open(EditProfileComponent);
    _dialog.afterOpened().subscribe({
      next: () => {
        this.removeNavClass();
      },
    });
    _dialog.afterClosed().subscribe({
      next: () => {
        this.AddNavClass();
        this.getProfile();
      },
    });
  }
  changePassword() {
    const _dialog = this.matDialog.open(ChangePasswordComponent);
    _dialog.afterOpened().subscribe({
      next: () => {
        this.removeNavClass();
      },
    });
    _dialog.afterClosed().subscribe({
      next: () => {
        this.AddNavClass();
        this.getProfile();
        this.getAddresses();
      },
    });
  }

  deleteProfile() {
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
        this.http.delete(`customers/account`).subscribe({
          next: (res: any) => {
            Swal.fire('Deleted!', 'Your profile has been deleted.', 'success');
            localStorage.removeItem('token');
            this.route.navigate(['/shop/products']);
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

  editAddress(address: any) {
    const _dialog = this.matDialog.open(AddressActionComponent, {
      width: '1000px',
      data: address,
    });
    _dialog.afterOpened().subscribe({
      next: () => {
        this.removeNavClass();
      },
    });
    _dialog.afterClosed().subscribe({
      next: () => {
        this.AddNavClass();
        this.getProfile();
        this.getAddresses();
      },
    });
  }
  addAddress() {
    const _dialog = this.matDialog.open(AddressActionComponent, {
      data: null,
    });
    _dialog.afterOpened().subscribe({
      next: () => {
        this.removeNavClass();
      },
    });
    _dialog.afterClosed().subscribe({
      next: () => {
        this.AddNavClass();
        this.getProfile();
        this.getAddresses();
      },
    });
  }

  removeNavClass() {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    navbar.classList.remove('sticky-top');
  }

  AddNavClass() {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    navbar.classList.add('sticky-top');
  }

  deleteAddress(id: any) {
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
        this.http.delete(`customers/address/${id}`).subscribe({
          next: (res: any) => {
            Swal.fire('Deleted!', 'Your address has been deleted.', 'success');
            this.getAddresses();
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
}
