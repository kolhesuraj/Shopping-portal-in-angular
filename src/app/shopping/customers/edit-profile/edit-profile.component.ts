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
  updatingImage: boolean = false;
  updatingDetails: boolean = false;
  updating: boolean = false;

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

  getProfile() {
    this.updatingImage = false;
    this.updatingDetails = false;
    this.updating = false;
    this.http.get('shop/auth/self').subscribe({
      next: (res) => {
        // console.log(res);
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
        this.updating = true;
        this.http.delete('customers/profile-picture').subscribe({
          next: (res: any) => {
            this.toster.success('Profile Picture Removed!');
            this.getProfile();
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
      this.updatingDetails = true;
      this.http
        .patch('customers/update-profile', this.editProfile.value)
        .subscribe({
          next: (res:any) => {
            // console.log(res);
            this.toster.success('Profile Details Updated');
            this.getProfile();
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
  loadImageFailed() {
    // show message
    this.toster.error('File format not supported');
    this.imageChangedEvent = '';
  }
  uploadeImage() {
    this.updatingImage = true;
    const formData = new FormData();
    formData.append('picture', this.ImageReady);
    this.http.post('customers/profile-picture', formData).subscribe({
      next: (res:any) => {
        // console.log(res);
        this.toster.success('Profile Picture Updated');
        this.imageChangedEvent = '';
        this.open = true;
        this.getProfile();
      },
      error: () => {
        this.updatingImage = false;
      },
    });
  }
}
