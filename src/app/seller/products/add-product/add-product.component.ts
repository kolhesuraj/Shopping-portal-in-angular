import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  addProductForm!: FormGroup;
  incomplete: boolean = false;
  imageSrc: any = [];

  constructor(
    private httpservice: HttpServiceService,
    public fb: FormBuilder,
    private route: Router,
    private authService: SocialAuthService
  ) {}
  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      images: ['', [Validators.required]],
    });
  }

  get Name() {
    return this.addProductForm.get('name');
  }
  get images() {
    return this.addProductForm.get('images');
  }
  get description() {
    return this.addProductForm.get('description');
  }
  get price() {
    return this.addProductForm.get('price');
  }
  imagetoupload: any = [];
  imageSelected(event: any) {
    // console.log(event.target.files);
    let images: any = event.target.files;
    this.readURL(event);
    if (images) {
      this.addProductForm.controls['images'].setValue(images);
    }
  }

  addProduct() {
    if (this.addProductForm.valid) {
      this.incomplete = false;
      /* Creating a formdata object and appending the values to it. */
      const formdata: FormData = new FormData();
      formdata.append('name', this.addProductForm.value.name);
      formdata.append('description', this.addProductForm.value.description);
      formdata.append('price', this.addProductForm.value.price);

      for (let i = 0; i < this.addProductForm.value.images.length; i++) {
        formdata.append('images', this.addProductForm.value.images[i]);
      }

      this.httpservice.post('products', formdata).subscribe({
        next: () => {
          Swal.fire('Product Added successfully', 'Go for next product');
          this.addProductForm.reset();
          this.reset();
        },
        error: (err) => {
          Swal.fire(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Something went wrong! ${err}`,
          });
        },
      });
    } else {
      this.incomplete = true;
    }
  }
  logout() {
    this.authService.signOut();
    localStorage.removeItem('LoginUser');
    this.route.navigate(['/seller/auth']);
  }

  cancel() {
    this.reset();
    this.route.navigate(['/seller/products/list']);
  }

  reset() {
    this.incomplete = false;
    this.imageSrc = [];
  }
  readURL(event: any): void {
    this.imageSrc = [];
    if (event.target.files.length > 0) {
      const file = event.target.files;
      [...file].forEach((element: any) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc.push(reader.result);
        };
        reader.readAsDataURL(element);
      });

      console.log(this.imageSrc);
    }
  }
}
