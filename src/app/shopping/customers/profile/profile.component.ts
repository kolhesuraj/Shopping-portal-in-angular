import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
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
  cart: any;
  pagenumber: number = 1;
  constructor(
    private http: HttpServiceService,
    private matDialog: MatDialog,
    private route: Router,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.getProfile();
    this.getAddresses();
    this.getOrders();
  }
  getOrders() {
    this.http.get(`shop/orders?page=${this.pagenumber}`).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.cart = res;
      },
    });
  }
  Logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/shop/products']);
  }
  getProfile() {
    this.http.get('shop/auth/self').subscribe({
      next: (res) => {
        // console.log(res);
        this.profile = res;
      },
    });
  }
  getAddresses() {
    this.http.get('customers/address').subscribe({
      next: (res) => {
        // console.log(res);
        this.addresses = res;
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
          next: (_res: any) => {
            Swal.fire('Deleted!', 'Your profile has been deleted.', 'warning');
            localStorage.removeItem('token');
            this.route.navigate(['/shop/products']);
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
          next: (_res: any) => {
            Swal.fire('Deleted!', 'Your address has been deleted.', 'success');
            this.getAddresses();
          },
        });
      }
    });
  }

  cancelOrder(id: string) {
    Swal.fire({
      title: `Are you sure? <p>Delete Product Id: ${id}</p>`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.patch(`shop/orders/cancel/${id}`, null).subscribe({
          next: (_res: any) => {
            // console.log(res);
            this.toast.success('Your Order has been Canceled');
            this.getOrders();
          },
        });
      }
    });
  }
  // orderDetails(id: string) {
  //   this.route.navigate([`shop/customer/order/${id}`]);
  // }
  gotoPage(page: number) {
    this.pagenumber = page;
    this.getOrders();
  }
}
