import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpsInterceptor } from './http.interceptor';



describe('LodderInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HttpsInterceptor],
      imports:[RouterTestingModule]
    })
  );

  it('should be created', () => {
    const interceptor: HttpsInterceptor = TestBed.inject(HttpsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
