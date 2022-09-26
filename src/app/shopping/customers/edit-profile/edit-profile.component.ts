import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-picture',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  profile: any;
  editProfile!: FormGroup;
  profileGet: any;

  constructor(
    private http: HttpServiceService,
    private fb: FormBuilder,
    private _matDialog: MatDialogRef<EditProfileComponent>
  ) {}

  ngOnInit(): void {
    this.getProfile();
    this.editProfile = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  close() {
    this._matDialog.close();
  }
  getProfile() {
    this.http.get('shop/auth/self').subscribe({
      next: (res) => {
        console.log(res);
        this.profile = res;
        this.editProfile.setValue({
          name: this.profile?.name,
          email: this.profile.email,
        });
      },
    });
  }
  delete() {
    this.http.delete('customers/profile-picture').subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire('Profile Picture Deleted successfully');
        this.getProfile();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  uploadeImage() {
    const formData = new FormData();
    formData.append('picture', this.profileGet);
    this.http.post('customers/profile-picture', formData).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire('Profile Picture Updated');
        this.getProfile();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  checkImg(event: any) {
    if (event.target.files.length > 0) {
      this.profileGet = event.target.files[0];
    }
  }

  update() {
    if (this.editProfile.valid) {
      this.http
        .patch('customers/update-profile', this.editProfile.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            Swal.fire('profile details updated');
            this.getProfile();
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
