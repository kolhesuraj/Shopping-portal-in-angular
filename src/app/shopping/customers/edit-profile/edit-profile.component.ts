import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { HotToastService } from '@ngneat/hot-toast';

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
    private _matDialog: MatDialogRef<EditProfileComponent>,
    private toster: HotToastService
  ) {}

  ngOnInit(): void {
    this.editProfile = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.getProfile();
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
        this.http.delete('customers/profile-picture').subscribe({
          next: (res: any) => {
            Swal.fire(
              'Deleted!',
              'Your profile Picture has been deleted.',
              'success'
            );
            this.getProfile();
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
  imageChangedEvent: any = '';
  croppedImage: any = '';
  open = true;
  ImageReady: any;
  openImageBox() {
    this.open = false;
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.ImageReady = base64ToFile(this.croppedImage);
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
    this.toster.error('File format not supported');
    this.imageChangedEvent = '';
  }
  uploadeImage() {
    const formData = new FormData();
    formData.append('picture', this.ImageReady);
    this.http.post('customers/profile-picture', formData).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire('Profile Picture Updated');
        this.imageChangedEvent = '';
        this.open = true;
        this.getProfile();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
