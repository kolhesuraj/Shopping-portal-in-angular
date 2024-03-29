import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';
import { Editor, Toolbar } from 'ngx-editor';
import { HotToastService } from '@ngneat/hot-toast';

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
  editor!: Editor;
  updating: boolean = false;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: dialogdata,
    private httpservice: HttpServiceService,
    private route: Router,
    private authService: SocialAuthService,
    private fb: FormBuilder,
    public _dialogRef: MatDialogRef<UpdateProductComponent>,
    private toaster: HotToastService
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();

    this.updateProductForm = this.fb.group({
      name: [this.data.name, [Validators.required]],
      description: [this.data.description, [Validators.required]],
      price: [this.data.price, [Validators.required]],
    });
    console.log(this.updateProductForm.value.description);
  }

  ngOnDestroy(): void {
    this.editor.destroy();
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
      this.updating = true;
      /* Creating a formdata object and appending the values to it. */

      this.httpservice
        .patch(
          `products/${this.data.product_id} `,
          this.updateProductForm.value
        )
        .subscribe(() => {
          this.toaster.success('Product Details Updated');
          this.updateProductForm.reset();
          this._dialogRef.close();
        });
    } else {
      this.incomplete = true;
      this.updating = false;
    }
  }

  logout() {
    this.authService.signOut();
    localStorage.removeItem('LoginUser');
    this.route.navigate(['/auth']);
  }
}
