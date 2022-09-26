import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { CustomersService } from '../../services/customers.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
Logout() {
throw new Error('Method not implemented.');
}
deleteProfile() {
throw new Error('Method not implemented.');
}
  profile!: any;
  customer!: any;
  constructor(
    private service: CustomersService,
    private http: HttpServiceService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProfile();
    this.getAddresses();
  }
  getProfile() {
    this.customer = this.service.getCustomer();
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
  getAddresses(){
    this.http.get('customers/address').subscribe({
      next: (res)=>{
        console.log(res)
      },
      error: (err)=>{
        console.log(err)
      }
    });
  }
  editProfile() {
    const _dialog = this.matDialog.open(EditProfileComponent);
    _dialog.afterClosed().subscribe({
      next: ()=>{
        this.getProfile();
      }
    })
  }
}
