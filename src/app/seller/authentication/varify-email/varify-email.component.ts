import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from '../../../services/http/http-service.service';

@Component({
  selector: 'app-varify-email',
  templateUrl: './varify-email.component.html',
  styleUrls: ['./varify-email.component.css'],
})
export class VarifyEmailComponent implements OnInit {
  constructor(
    private activateRoute: ActivatedRoute,
    private httpservice: HttpServiceService
  ) {}
  verificationToken: string = '';
  verify: number = 2;
  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params) => {
      this.verificationToken = params['token'];
    });
    this.httpservice
      .post(`auth/verify-email?token=${this.verificationToken}`, null)
      .subscribe({
        next: (res: any) => {
          this.verify = 1;
        },
      });
  }
}
