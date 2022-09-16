import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  list: any = {};
  constructor(
    private route: Router,
    private authService: SocialAuthService,
    private httpservice: HttpServiceService
  ) {
    this.getProducts();
  }

  ngOnInit(): void {}

  getProducts() {
    this.httpservice.get('products').subscribe({
      next: (res) => {
        console.log(res);
        this.list = res;
        // console.log(this.list);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  logout() {
    this.authService.signOut();
    localStorage.removeItem('LoginUser');
    this.route.navigate(['/auth']);
  }

  deleteProduct(product_id: any) {
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
         this.httpservice.delete(`products/${product_id}`).subscribe({
          next: (res: any) => {
             Swal.fire('Deleted!', 'Your Product has been deleted.', 'success');
             this.getProducts();
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

  gotoproduct(id:any) {
    this.route.navigate([`/products/product`,id]);
  }
}
