import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { CustomersService } from '../../services/customers.service';
import { EditPictureComponent } from '../edit-picture/edit-picture.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile!: any;
  customer!: any;
  constructor(
    private service: CustomersService,
    private http: HttpServiceService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }
  getProfile() {
    this.customer = this.service.getCustomer();
    this.http.get('shop/auth/self').subscribe({
      next: (res) => {
        // console.log(res);
        this.profile = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  editPicture() {
    const _dialog = this.matDialog.open(EditPictureComponent)
  }
}
