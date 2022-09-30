import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';
import { UpdateImagesComponent } from '../update-images/update-images.component';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product: any;
  productId: any;
  constructor(
    private activateRoute: ActivatedRoute,
    private httpservice: HttpServiceService,
    private authService: SocialAuthService,
    private route: Router,
    private _dialog: MatDialog,
    private toaster: HotToastService
  ) {
    this.productId = this.activateRoute.snapshot.paramMap.get('id');
    this.getDetails();
  }

  ngOnInit(): void {}
  getDetails() {
    this.httpservice.get(`products/${this.productId}`).subscribe({
      next: (res) => {
        this.product = res;
        // console.log(res);
        // console.log(this.product);
      }
    });
  }

  logout() {
    this.authService.signOut();
    localStorage.removeItem('LoginUser');
    this.route.navigate(['/seller/auth']);
  }
  update() {
    const dialog = this._dialog.open(UpdateProductComponent, {
      width: '100%',
      data: {
        product_id: this.productId,
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
      },
    });
    dialog.afterClosed().subscribe(() => {
      this.getDetails();
    });
  }
  updateImages() {
    const dialog = this._dialog.open(UpdateImagesComponent, {
      width: '100%',
      data: {
        product: this.product,
      },
    });
    dialog.afterOpened().subscribe(() => {
      const first = document.querySelector('.navbar') as HTMLElement;
      first.classList.remove('sticky-top');
    });
    dialog.afterClosed().subscribe(() => {
      const first = document.querySelector('.navbar') as HTMLElement;
      first.classList.add('sticky-top');
      this.getDetails();
    });
  }

  deleteProduct() {
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
        this.httpservice.delete(`products/${this.productId}`).subscribe({
          next: () => {
            this.toaster.success('Product Deleted!')
            this.route.navigate(['./products']);
          }
        });
      }
    });
  }
}
