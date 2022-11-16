import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http/http-service.service';

@Component({
  selector: 'app-order-deatails',
  templateUrl: './order-deatails.component.html',
  styleUrls: ['./order-deatails.component.css'],
})
export class OrderDeatailsComponent implements OnInit {
  orderId: any;
  orderDetails: any;
  constructor(
    private http: HttpServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: SocialAuthService
  ) {
    this.getDeatils();
  }

  ngOnInit(): void {}

  getDeatils() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.http.get(`orders/${this.orderId}`).subscribe({
      next: (res:any) => {
        console.log(res);
        this.orderDetails = res[0];
      },
    });
  }
  logout() {
    this.authService.signOut();
    localStorage.removeItem('LoginUser');
    this.router.navigate(['/seller/auth']);
  }
}
