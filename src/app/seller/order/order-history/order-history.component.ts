import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpServiceService } from 'src/app/services/http/http-service.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  pagenumber: number = 1;
  orders: any;
  constructor(
    private http: HttpServiceService,
    private route: Router,
    private toast: HotToastService,

  ) {
    this.getOrder();
  }

  ngOnInit(): void {}
  getOrder(): void {
    this.http.get(`orders?page=${this.pagenumber}`).subscribe({
      next: (res) => {
        // console.log(res);
        this.orders = res;
      },
    });
  }
  // orderDetails(id: string) {
  //   this.route.navigate([`seller/orders/order-deatails/${id}`]);
  // }
  gotoPage(page: number) {
    this.pagenumber = page;
    this.getOrder();
  }
  dispatchOrder(id: any) {
    this.http.patch(`orders/dispatch/${id}`, null).subscribe({
      next: (res) => {
        // console.log(res);
        this.toast.success('Order Marked as Dispatched!!');
        this.getOrder();
      },
    });
  }
  deliveredOrder(id: any) {
    this.http.patch(`orders/deliver/${id}`, null).subscribe({
      next: (res) => {
        // console.log(res);
        this.toast.success('Order Marked as Delivered!!');
        this.getOrder();
      },
    });
  }
  cancleOrder(id: any) {
    this.http.patch(`orders/cancel/${id}`, null).subscribe({
      next: (res) => {
        // console.log(res);
        this.toast.error('Order Canceled!!');
        this.getOrder();
      },
    });
  }

}
