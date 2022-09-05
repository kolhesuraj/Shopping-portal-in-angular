import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, finalize, Observable } from 'rxjs';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class LodderInterceptor implements HttpInterceptor {
  constructor(private ls: LoginService, private route: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.ls.loader.next(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.ls.loader.next(false);
      }),
      catchError((error: HttpErrorResponse) => {
        let status = error.status;
        if (status == 401) {
          Swal.fire('token expire', ' please login again');
          localStorage.removeItem('LoginUser');
          this.route.navigate(['/auth']);
        }
        throw new Error('error');
      })
    );
  }
}
