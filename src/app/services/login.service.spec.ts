import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('loader activate', () => {
    service.showloader();
    service.hideloader();
  });
  it('get profile', () => {
    let dummy = ['name'];
    localStorage.setItem('data', JSON.stringify(dummy));
    let data = service.orgProfile();
    expect(data).toEqual(dummy);
  });
});
