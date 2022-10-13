import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  orderId: any;
  orderDetails: any;
  constructor(
    private activateRoute: ActivatedRoute,
    private http: HttpServiceService
  ) {}

  ngOnInit(): void {
    this.orderId = this.activateRoute.snapshot.paramMap.get('id');
    this.getOrderDetails();
  }
  getOrderDetails() {
    this.http.get(`shop/orders/${this.orderId}`).subscribe({
      next: (res: any) => {
        this.orderDetails = res[0];
        console.log(this.orderDetails);
      },
    });
  }
  @ViewChild('htmlData') htmlData!: ElementRef;
  public openPDF(): void {
    let DATA: any = document.getElementById('data');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(`${this.orderId}.pdf`);
      // console.log(PDF);
    });
  }
}
