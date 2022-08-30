import { TestBed } from '@angular/core/testing';

import { LodderInterceptor } from './lodder.interceptor';

describe('LodderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LodderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LodderInterceptor = TestBed.inject(LodderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
