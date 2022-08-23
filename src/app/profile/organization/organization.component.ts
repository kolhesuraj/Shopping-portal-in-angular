import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
})
export class OrganizationComponent implements OnInit {
  constructor(
    private httpService: HttpServiceService,
    private ls: LoginService
  ) {}

  orgData: any;
  orgName!: string;
  orgEmail!: string;
  org!: string;
  list: any;
  ngOnInit(): void {
    this.profile();
    this.httpService.orgUsers().subscribe({
      next: (res: any) => {
        console.log(res);
        this.list = res;
      },
      error: (err: any) => {
        console.error();
      },
    });
  }
  profile() {
    this.orgData = this.ls.orgProfile();
    console.log(this.orgData);
    this.orgName = this.orgData.user._org.name;
    this.orgEmail = this.orgData.user._org.email;
    this.org = this.orgName.slice(0, 2).toUpperCase();
  }

  deleteUser(id: any) {
    console.log(id)
  }
  updateUser(id: any) {
    console.log(id);
    
  }
}
