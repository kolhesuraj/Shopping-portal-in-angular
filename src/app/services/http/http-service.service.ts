import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  // registerUrl = 'https://ngminds.herokuapp.com/auth/register?captcha=false';
  // loginUrl = 'https://ngminds.herokuapp.com/auth/login?captcha=false';
  // profileUrl = 'https://ngminds.herokuapp.com/auth/self';
  // sendVarrification = ' https://ngminds.herokuapp.com/auth/send-verification-email';
  url = 'https://ngminds.herokuapp.com/';

  constructor(private http: HttpClient) {}

  post(url: string, body: any) {
    return this.http.post(`${this.url}${url}`, body);
  }

  get(url: string) {
    return this.http.get(`${this.url}${url}`);
  }

  delete(url: string) {
    return this.http.delete(`${this.url}${url}`);
  }

  patch(url: string, body: any) {
    return this.http.patch(`${this.url}${url}`, body);
  }

  put(url:string,body:any){
    return this.http.put(`${this.url}${url}`,body);
  }

  /**
   * This function sends a verification email to the user's email address
   * @param {any} tokenGet - The token you get from the Register API.
   */
  sendVerrification(tokenGet: any): Observable<any> {
    console.log(tokenGet);
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenGet}`,
    });
    return this.http.post(
      this.url + 'auth/send-verification-email?captcha=false',
      null,
      { headers: header }
    );
  }
  // register(data: any): Observable<any> {
  //   // console.log(data);
  //   return this.http.post(`${this.url}auth/register`, data);
  // }

  // login(dataSent: any): Observable<any> {
  //   return this.http.post(`${this.url}auth/login`, dataSent);
  // }

  // socialLogin(user: any, catpchaget: any): Observable<any> {
  //   let data: any;
  //   let provider!: String;

  //   // console.log(catpchaget)
  //   if (user.provider == 'GOOGLE') {
  //     provider = 'google';
  //     data = {
  //       token: user.idToken,
  //       captcha: catpchaget,
  //     };
  //   } else {
  //     provider = 'facebook';
  //     data = {
  //       token: user.authToken,
  //       captcha: catpchaget,
  //     };
  //   }
  //   // console.log(data);
  //   return this.http.post(`${this.url}auth/login/${provider}`, data);
  // }

  // profileView(): Observable<any> {
  //   // let tocken = this.ls.gettoken();
  //   // let header = new HttpHeaders({
  //   //   'Content-Type': 'application/json',
  //   //   Authorization: `Bearer ${tocken}`,
  //   // });

  //   return this.http.get(`${this.url}auth/self`);
  // }

  // finalVerifyEmail(verificationToken: string): Observable<any> {
  //   // console.log(varificationToken);
  //   return this.http.post(
  //     `${this.url}auth/verify-email?token=${verificationToken}`,
  //     null
  //   );
  // }

  // addOrgUser(data: any): Observable<any> {
  //   // let tocken = this.ls.gettoken();
  //   // let header = new HttpHeaders({
  //   //   'Content-Type': 'application/json',
  //   //   Authorization: `Bearer ${tocken}`,
  //   // });
  //   return this.http.post(`${this.url}users`, data);
  // }

  // orgUsers(data: any): Observable<any> {
  //   // let tocken = this.ls.gettoken();
  //   // let header = new HttpHeaders({
  //   //   'Content-Type': 'application/json',
  //   //   Authorization: `Bearer ${tocken}`,
  //   // });
  //   // console.log(data);
  //   return this.http.get(`${this.url}users?${data}`);
  // }

  // deleteUser(id: any): Observable<any> {
  //   // let tocken = this.ls.gettoken();
  //   // let header = new HttpHeaders({
  //   //   'Content-Type': 'application/json',
  //   //   Authorization: `Bearer ${tocken}`,
  //   // });
  //   return this.http.delete(`${this.url}users/${id}`);
  // }
  // updateOrg(data: any): Observable<any> {
  //   // let tocken = this.ls.gettoken();
  //   // let header = new HttpHeaders({
  //   //   'Content-Type': 'application/json',
  //   //   Authorization: `Bearer ${tocken}`,
  //   // });
  //   return this.http.patch(`${this.url}users/org`, data);
  // }

  // updateUser(id: string, name: string, email: string): Observable<any> {
  //   const data = {
  //     name: name,
  //     email: email,
  //   };
  //   // let tocken = this.ls.gettoken();
  //   // let header = new HttpHeaders({
  //   //   'Content-Type': 'application/json',
  //   //   Authorization: `Bearer ${tocken}`,
  //   // });
  //   return this.http.patch(`${this.url}users/${id}`, data);
  // }

  // updateRole(role: any, id: any) {
  //   // let tocken = this.ls.gettoken();
  //   // let header = new HttpHeaders({
  //   //   'Content-Type': 'application/json',
  //   //   Authorization: `Bearer ${tocken}`,
  //   // });
  //   return this.http.patch(`${this.url}users/role/${id}`, role);
  // }

  // forgotPassword(body: any) {
  //   return this.http.post(`${this.url}auth/forgot-password`, body);
  // }

  // resetPassword(body: any, token: any) {
  //   // console.log(body);
  //   return this.http.post(
  //     `${this.url}auth/reset-password?token=${token}`,
  //     body
  //   );
  // }
  // changePassword(body: any) {
  //   // console.log(body);
  //   // let tocken = this.ls.gettoken();
  //   // let header = new HttpHeaders({
  //   //   'Content-Type': 'application/json',
  //   //   Authorization: `Bearer ${tocken}`,
  //   // });
  //   return this.http.post(`${this.url}users/auth/change-password`, body);
  // }
}
