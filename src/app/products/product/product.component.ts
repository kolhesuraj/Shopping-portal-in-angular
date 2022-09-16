import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http/http-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(
    private activateRoute: ActivatedRoute,
    private httpservice: HttpServiceService
  ) {}
  productId: any;
  ngOnInit(): void {
    this.productId = this.activateRoute.snapshot.paramMap.get('id')
    this.getDetails();
  }
  getDetails() {
    this.httpservice.get(`products/${this.productId}`).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
