import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from '../services/http-service.service';

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
  varificationToken: string = '';
  verify!:number;
  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params) => {
      this.varificationToken = params['token'];
    });
    // console.log(this.varificationToken);
    this.httpservice.finalVarifyEmail(this.varificationToken).subscribe({
      next: (res) => {
        console.warn(res);
        this.verify = 1;
      },
      error: (err) => {
        console.log(err);
        this.verify = 0;
      },
    });
  }
}
