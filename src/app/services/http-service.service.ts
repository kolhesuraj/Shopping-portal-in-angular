import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  // registerUrl = 'https://ngminds.herokuapp.com/auth/register?captcha=false';
  // loginUrl = 'https://ngminds.herokuapp.com/auth/login?captcha=false';
  // profileUrl = 'https://ngminds.herokuapp.com/auth/self';
  // sendVarrification = ' https://ngminds.herokuapp.com/auth/send-verification-email';
  url = 'https://ngminds.herokuapp.com/';

  constructor(private http: HttpClient, private ls: LoginService) {}

  register(data: any): Observable<any> {
    // console.log(data);
    return this.http.post(this.url + 'auth/register?captcha=false', data);
  }

  login(dataSent: { email: any; password: any }): Observable<any> {
    return this.http.post(this.url + 'auth/login?captcha=false', dataSent);
  }

  profileView(): Observable<any> {
    let tocken = this.ls.gettoken();
    // console.log(tocken);

    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tocken}`,
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmY0OWMyNzg2MTIwZDk4NzRiYmQwMjQiLCJpYXQiOjE2NjAyMTEzMzgsImV4cCI6MTY2MDI5NzczOCwidHlwZSI6ImFjY2VzcyJ9.0R5lwzSAxjkpD5JkFTZx-uGOgCTrCSAgqZqWiMi75eA`,
    });

    return this.http.get(this.url + 'auth/self', { headers: header });
  }

  sendVerrification(tokenGet: any): Observable<any> {
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

  finalVerifyEmail(verificationToken: string): Observable<any> {
    // console.log(varificationToken);
    return this.http.post(
      `${this.url}auth/verify-email?token=${verificationToken}`,
      null
    );
  }

  addOrgUser(data: any): Observable<any> {
    let tocken = this.ls.gettoken();
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tocken}`,
    });
    return this.http.post(`${this.url}users`, data, { headers: header });
  }

  orgUsers(pagenumber:number): Observable<any> {
    let tocken = this.ls.gettoken();
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tocken}`,
    });
    return this.http.get(`${this.url}users?page=${pagenumber}`, { headers: header });
  }

  deleteUser(id:any):Observable<any> {
    let tocken = this.ls.gettoken();
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tocken}`,
    });
    return this.http.delete(`${this.url}users/${id}`, { headers: header });
  }
}
