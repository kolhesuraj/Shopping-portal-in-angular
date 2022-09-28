import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { elementAt } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';
interface dialogdata {
  product: any;
}

@Component({
  selector: 'app-update-images',
  templateUrl: './update-images.component.html',
  styleUrls: ['./update-images.component.css'],
})
export class UpdateImagesComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: dialogdata,
    private httpservice: HttpServiceService,
    private _dialogRef: MatDialogRef<UpdateImagesComponent>
  ) {}
  product: any;
  deletearray: any[] = [];
  imageSrc: any = [];
  images: File[] = [];
  ngOnInit(): void {
    console.log(this.data);
    this.product = this.data.product;
  }
  update() {
    let formdata = new FormData();
    this.deletearray.forEach((element) => {
      formdata.append('delete', element);
    });
    this.files.forEach((element) => {
      formdata.append('new_images', element);
    });
    this.httpservice
      .patch(`products/images/${this.product._id}`, formdata)
      .subscribe({
        next: (res) => {
          console.log(res);
          Swal.fire({ title: 'Images Updated Successfully', icon: 'success' });
          this._dialogRef.close();
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Something went wrong! ${err}`,
          });
        },
      });
  }
  deleteimg(id: number) {
    console.log(this.deletearray);
    let token = false;
    if (this.deletearray.length < 1) {
      this.deletearray.push(id);
      token = true;
    } else {
      this.deletearray.forEach((element, index) => {
        // console.log(element);
        if (element == id) {
          this.deletearray.splice(index, 1);
          // console.log(this.deletearray);
          token = true;
        }
      });
      if (token == false) {
        this.deletearray.push(id);
      }
    }
  }
  // imageSelected(event: any) {
  //   // console.log(event.target.files);
  //   let image: any[] = event.target.files;
  //   this.readURL(event);
  //   // this.images = [];
  //   if (image) {
  //     console.log(image);
  //     for (let i = 0; i < image.length; i++) {
  //       this.images.push(image[i]);
  //     }
  //   }
  // }
  // readURL(event: any): void {
  //   this.imageSrc = [];
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files;
  //     [...file].forEach((element: any) => {
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         this.imageSrc.push(reader.result);
  //       };
  //       reader.readAsDataURL(element);
  //     });

  //     console.log(this.imageSrc);
  //   }
  // }
  files: File[] = [];

  onSelect(event:any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
