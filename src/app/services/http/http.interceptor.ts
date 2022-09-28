import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, finalize, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { LoginService } from '../login.service';

@Injectable()
export class HttpsInterceptor implements HttpInterceptor {
  constructor(
    private ls: LoginService,
    private route: Router,
    private toster: HotToastService,
    private activateRoute: ActivatedRoute
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
    this.ls.showloader();
    console.log(request);
    const url = request.url;
    if (this.isAuthRequaire(request.url) == false) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${
            this.isSeller() ? this.ls.gettoken() : localStorage.getItem('token')
          }`,
        },
      });
      // console.log(request);
    }

    /* This is the code that is executed when the request is sent to the server. */
    return next.handle(request).pipe(
      finalize(() => {
        this.ls.hideloader();
      }),
      catchError((error: HttpErrorResponse) => {
        let status = error.status;
        this.toster.error(error.error.message);
        if (status == 401) {
          localStorage.removeItem('LoginUser');
          localStorage.removeItem('token');
          this.route.navigate(['/']);
        }
        throw new Error('error');
      })
    );
    // return next.handle(request).do((event: HttpEvent<any>) => {
    //   if (event instanceof HttpResponse) {

    // }
    // })
  }

  /**
   * It returns true if the url contains any of the strings in the findArray
   * @param {string} url - The URL that the user is trying to access.
   */
  isAuthRequaire(url: string) {
    let result: boolean = false;
    let findArray = [
      'login',
      'register',
      'forgot-password',
      'reset-password',
      'verify-email',
      'send-verification-email',
    ];
    findArray.forEach((element) => {
      if (url.includes(element)) {
        result = true;
      }
    });
    return result;
  }
  isSeller() {
        let route: any = this.activateRoute.snapshot;
    console.log(route._routerState.url);
    if (route._routerState.url.includes('seller')) {
      return true
    } else {
      return false
    }
  }
}
