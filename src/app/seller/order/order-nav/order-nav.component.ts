import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-nav',
  templateUrl: './order-nav.component.html',
  styleUrls: ['./order-nav.component.css'],
})
export class OrderNavComponent implements OnInit {
  constructor(private authService: SocialAuthService, private route: Router) {}

  ngOnInit(): void {}
  logout() {
    this.authService.signOut();
    localStorage.removeItem('LoginUser');
    this.route.navigate(['/seller/auth']);
  }
}
