import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthServiceConfig,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';

import { OrderDeatailsComponent } from './order-deatails.component';

const data = {
  user: 1,
};

describe('OrderDeatailsComponent', () => {
  let component: OrderDeatailsComponent;
  let fixture: ComponentFixture<OrderDeatailsComponent>;
  let http: HttpServiceService;
  let auth: SocialAuthService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDeatailsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
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
    auth = TestBed.inject(SocialAuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('logout', () => {
    spyOn(auth, 'signOut');
    component.logout();
  });
});
