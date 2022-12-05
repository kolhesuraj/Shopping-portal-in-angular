import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
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
    public dialogRef: MatDialogRef<UpdateImagesComponent>,
    private toaster: HotToastService
  ) {}
  product: any;
  deletearray: any[] = [];
  imageSrc: any = [];
  images: File[] = [];
  updating: boolean = false;
  ngOnInit(): void {
    console.log(this.data);
    this.product = this.data.product;
  }
  update() {
    this.updating = true;
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
          this.toaster.success('Images Updated');
          this.dialogRef.close();
        },
      });
  }
  deleteimg(id: number) {
    // console.log(this.deletearray);
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
  files: File[] = [];

  onSelect(event: any) {
    // console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
