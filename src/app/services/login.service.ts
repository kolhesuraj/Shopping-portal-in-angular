import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  data: any;
  dataGet: any;
  varify: boolean = false;
  LogIndata = new BehaviorSubject({});

  constructor() {}

  // login(_Id: any, _Password: any) {
  //   this.dataGet = this.getData();
  //   this.dataGet.forEach(
  //     (i: {
  //       FirstName: any;
  //       LastName: any;
  //       CompanyName: any;
  //       Email: string;
  //       Password: string;
  //     }) => {
  //       if (i.Email == _Id && i.Password == _Password) {
  //         let temp: any = {
  //           FirstName: i.FirstName,
  //           LastName: i.LastName,
  //           CompanyName: i.CompanyName,
  //           Email: i.Email,
  //           Password: i.Password,
  //         };
  //         localStorage.setItem('LoginUser', JSON.stringify(temp));
  //         this.LogIndata.next(temp);
  //         // this.setLogin(i.Email);
  //         this.varify = true;
  //       }
  //     }
  //   );
  //   return this.varify;
  // }
  // setLogin(Email: any) {
  //   let temp = this.data.find((Obj: { Email: string }) => Obj.Email == Email);
  //   console.log(temp);
  //   this.LogIndata.next(temp);
  //   console.log(temp)
  //   console.log(this.LogIndata);
  //   localStorage.setItem('LoginUser', JSON.stringify(temp));
  // }

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

  // getData() {
  //   // const raw = [
  //   //   {
  //   //     FirstName: 'Suraj',
  //   //     LastName: 'Kolhe',
  //   //     CompanyName: 'Angular Minds',
  //   //     Email: 'suraj@angularminds.in',
  //   //     Password: 'Suraj213',
  //   //     ConfirmPassword: 'Suraj213',
  //   //   },
  //   // ];
  //   // localStorage.setItem('registeredUser', JSON.stringify(raw));
  //   let temp: any = localStorage.getItem('registeredUser');
  //   this.data = JSON.parse(temp);
  //   // console.log(this.data);
  //   // if(this.data == ' '){
  //   //   return null;
  //   // }else{
  //   // return this.data;
  //   // }
  //   return this.data;
  // }

  // emailValidation: any = [];
  // emailValid(email: any) {
  //   this.emailValidation = this.getData();
  //   let token = false;
  //   if (this.emailValidation?.length > 0) {
  //     for (let i = 0; i < this.emailValidation.length; i++) {
  //       if (email == this.emailValidation[i].Email) {
  //         token = true;
  //       }
  //     }
  //   }

  //   return token;
  // }
}
