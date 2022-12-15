import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  // registerUrl = 'https://ngminds.herokuapp.com/auth/register?captcha=false';
  // loginUrl = 'https://ngminds.herokuapp.com/auth/login?captcha=false';
  // profileUrl = 'https://ngminds.herokuapp.com/auth/self';
  // sendVarrification = ' https://ngminds.herokuapp.com/auth/send-verification-email';
  // url = 'https://ngminds.herokuapp.com/';

  constructor(private http: HttpClient) {}

  post(url: string, body: any) {
    return this.http.post(`${environment.url}${url}`, body);
  }

  get(url: string) {
    return this.http.get(`${environment.url}${url}`);
  }

  delete(url: string) {
    return this.http.delete(`${environment.url}${url}`);
  }

  patch(url: string, body: any) {
    return this.http.patch(`${environment.url}${url}`, body);
  }

  put(url: string, body: any) {
    return this.http.put(`${environment.url}${url}`, body);
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
      environment.url + 'auth/send-verification-email?captcha=false',
      null,
      { headers: header }
    );
  }
}
