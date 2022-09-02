import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  LogIndata = new BehaviorSubject({});
  loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  loadData() {
    let temp: any = localStorage.getItem('LoginUser');
    // const data = JSON.parse(temp);
    this.setLogin(temp);
  }

  setLogin(data: any) {
    // console.log(data);
    this.LogIndata.next(data);
  }

  gettoken() {
    // console.log(localStorage.getItem('LoginUser'))
    return localStorage.getItem('LoginUser');
  }

  orgProfile() {
    const orgdata: any = localStorage.getItem('data');
    return JSON.parse(orgdata);
  }
}
