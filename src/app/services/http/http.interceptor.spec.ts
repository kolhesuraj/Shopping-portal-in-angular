import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, throwError } from 'rxjs';
import { HttpsInterceptor } from './http.interceptor';

describe('LodderInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HttpsInterceptor],
      imports: [RouterTestingModule, HttpClientTestingModule, HttpClientModule],
    })
  );

  it('should be created', () => {
    const interceptor: HttpsInterceptor = TestBed.inject(HttpsInterceptor);
    expect(interceptor).toBeTruthy();
  });
  it('is auth', () => {
    const interceptor: HttpsInterceptor = TestBed.inject(HttpsInterceptor);
    const url = 'login';
    let result = interceptor.isAuthRequaire(url);
    expect(result).toBeTrue();
  });
  it('isseller', () => {
    const interceptor: HttpsInterceptor = TestBed.inject(HttpsInterceptor);
    const url = 'seller';
    let result = interceptor.isSeller();
    expect(result).toBeFalse();
  });

  const next: any = {
    handle: () => {
      return Observable.create((subscriber: any) => {
        subscriber.complete();
      });
    },
  };
  it('interceptor', () => {
    const interceptor: HttpsInterceptor = TestBed.inject(HttpsInterceptor);

    const requestMock = new HttpRequest('GET', '/test');

    interceptor.intercept(requestMock, next).subscribe({});
  });

  it('should auto logout if 401 response returned from api', () => {
    //arrange
    const interceptor: HttpsInterceptor = TestBed.inject(HttpsInterceptor);

    const HttpRequestspy = new HttpRequest('GET', '/test');

    const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    httpHandlerSpy.handle.and.returnValue(
      throwError({ error: { message: 'test-error' }, status: '401' })
    );
    //act
    interceptor.intercept(HttpRequestspy, httpHandlerSpy).subscribe(
      (result) => console.log('good', result),
      (err) => {
        // console.log('error', err);
        expect(err.message).toEqual('error');
        expect(status).toBe('');
      }
    );

    //assert
  });
});
