import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpServiceService } from './http-service.service';

describe('HttpServiceService', () => {
  let service: HttpServiceService;
  let httpTestingController: HttpTestingController;
  let testUrl = 'https://shop-api.ngminds.com/';
  let testData = {
    name: 'mock data',
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(HttpServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should make put request', () => {
    let payload: any = {
      prop: 'data',
    };
    service.put('', payload).subscribe();
    const req = httpTestingController.expectOne({
      url: testUrl,
      method: 'PUT',
    });
    expect(req.request.body).toEqual(payload);
  });

  it('should make get request', () => {
    let result: any;
    service.get('').subscribe((data) => {
      result = data;
    });
    const req = httpTestingController.expectOne({
      url: testUrl,
      method: 'GET',
    });
    req.flush(testData);
    expect(result).toEqual(testData);
  });
  it('should make delete request', () => {
    let result: any;
    service.delete('').subscribe((data) => {
      result = data;
    });
    const req = httpTestingController.expectOne({
      url: testUrl,
      method: 'DELETE',
    });
    req.flush(testData);
    expect(result).toEqual(testData);
  });
  it('should make varifiacation request', () => {
    let result: any;
    service.sendVerrification('').subscribe((data) => {
      result = data;
    });
    const req = httpTestingController.expectOne({
      url: `${testUrl}auth/send-verification-email?captcha=false`,
      method: 'POST',
    });
    req.flush(testData);
    expect(result).toEqual(testData);
  });
});
