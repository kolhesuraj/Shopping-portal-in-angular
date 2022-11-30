import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';

import { OrderDeatailsComponent } from './order-deatails.component';

const data = {
  "user": 1,
};

class httpservice {
  get(url: string,): Observable<any> {
    return of(data);
  }
}

describe('OrderDeatailsComponent', () => {
  let component: OrderDeatailsComponent;
  let fixture: ComponentFixture<OrderDeatailsComponent>;
  let http: HttpServiceService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDeatailsComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [
        { provide: HttpServiceService, useClass: httpservice },
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(
                  '893913805202-rg7o6somctq21ike6dk1u0d696t64e0q.apps.googleusercontent.com'
                ),
              },
              {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider('365586852354146'),
              },
            ],
            onError: (err) => {
              console.error(err);
            },
          } as SocialAuthServiceConfig,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDeatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    http = TestBed.inject(HttpServiceService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('logout', () => {
    component.logout();
  });


});
