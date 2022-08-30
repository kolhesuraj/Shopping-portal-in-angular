import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class LodderInterceptor implements HttpInterceptor {

  constructor(private ls:LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.ls.loader.next(true);
    return next.handle(request).pipe(
      finalize(
        () => {
          this.ls.loader.next(false);
        }
      )
    );
  }
}
