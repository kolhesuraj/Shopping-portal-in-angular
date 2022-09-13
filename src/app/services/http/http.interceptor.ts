import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, finalize, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { LoginService } from '../login.service';
import { Token } from '@angular/compiler';

@Injectable()
export class HttpsInterceptor implements HttpInterceptor {
  constructor(
    private ls: LoginService,
    private route: Router,
    private toster: HotToastService
  ) {}

 /**
  * The function intercepts the request, adds the token to the request header, and then sends the
  * request to the next handler
  * @param request - HttpRequest<any> - The request object that is being intercepted.
  * @param {HttpHandler} next - The next interceptor in the chain.
  */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.ls.loader.next(true);
    // console.log(request);
    const url = request.url;
    if (this.isAuth(request.url) == false) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.ls.gettoken()}`,
        },
      });
    }
    return next.handle(request).pipe(
      finalize(() => {
        this.ls.loader.next(false);
      }),
      catchError((error: HttpErrorResponse) => {
        let status = error.status;
        this.toster.error(error.error.message);
        if (status == 401) {
          Swal.fire('token expire', ' please login again');
          localStorage.removeItem('LoginUser');
          this.route.navigate(['/auth']);
        }
        throw new Error('error');
      })
    );
  }



/**
 * It returns true if the url contains any of the strings in the findArray
 * @param {string} url - The URL that the user is trying to access.
 */
  isAuth(url: string) {
    let result: boolean = false;
    let findArray = ['login', 'register', 'forgot-password', 'reset-password', 'verify-email'];
    findArray.forEach(element => {
      if (url.includes(element)) {
        result = true;
      }
    });
    return result
  }
}
