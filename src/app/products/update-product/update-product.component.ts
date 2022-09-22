import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';

interface dialogdata {
  product_id: string;
  name: string;
  description: string;
  price: number;
}
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  updateProductForm!: FormGroup;
  incomplete: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: dialogdata,
    private httpservice: HttpServiceService,
    private route: Router,
    private authService: SocialAuthService,
    private fb: FormBuilder,
    private _dialogRef: MatDialogRef<UpdateProductComponent>
  ) {}

  ngOnInit(): void {
    this.updateProductForm = this.fb.group({
      name: [this.data.name, [Validators.required]],
      description: [this.data.description, [Validators.required]],
      price: [this.data.price, [Validators.required]],
    });
    console.log(this.data);
  }

  get Name() {
    return this.updateProductForm.get('name');
  }

  get description() {
    return this.updateProductForm.get('description');
  }
  get price() {
    return this.updateProductForm.get('price');
  }

  updateDetils() {
    if (this.updateProductForm.valid) {
      this.incomplete = false;
      /* Creating a formdata object and appending the values to it. */

      this.httpservice
        .patch(
          `products/${this.data.product_id} `,
          this.updateProductForm.value
        )
        .subscribe({
          next: () => {
            Swal.fire({
              title: 'Product updated successfully',
              icon: 'success',
            });
            this.updateProductForm.reset();
            this._dialogRef.close();
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
    this.route.navigate(['/auth']);
  }
}
