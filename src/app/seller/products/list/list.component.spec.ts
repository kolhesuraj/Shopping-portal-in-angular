import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterTestingModule } from '@angular/router/testing';
import { HotToastService } from '@ngneat/hot-toast';
import { NgDompurifyModule } from '@tinkoff/ng-dompurify';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';
import { AuthenticationModule } from '../../authentication/authentication.module';

import { ListComponent } from './list.component';

const data = {
  limit: 12,
  page: 1,
  results: [
    {
      createdAt: '2022-08-23T11:05:43.648Z',
      description: 'why',
      images: {
        public_id: 'training-api/ea0vq1fvxycr2ciw9jvt',
        url: 'http://res.cloudinary.com/abs-am/image/upload/v1661252738/training-api/ea0vq1fvxycr2ciw9jvt.jpg',
      },
      name: '1Second Product',
      price: 78,
      _id: '6304b48701e14c099c2399d1',
      _org: {
        email: 'abhijit.borade@gmail.com',
        name: 'Abhijit Borade Personal',
        _id: '62c46ee99cfd2025be823081',
      },
    },
  ],
  totalPages: 8,
  totalResults: 91,
};
class httpservice {
  get(url: string) {
    return of(data);
  }
  delete(url: string, body: any): Observable<any> {
    return of(data);
  }
}
Swal.fire().then((m) => {});
describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let http: HttpServiceService;
  let toaster: jasmine.SpyObj<HotToastService>;
  beforeEach(async () => {
    toaster = jasmine.createSpyObj<HotToastService>('HotToastService', [
      'info',
      'success',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        MatAutocompleteModule,
        HttpClientTestingModule,
        NgDompurifyModule,
      ],
      providers: [
        { provide: HotToastService, useValue: toaster },
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

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('for logout function', () => {
    component.logout();
  });
  it('for Goto Product function', () => {
    component.gotoproduct(1);
  }); // openNav() {
  //   this.flag = true;
  // }
  // closeNav() {
  //   this.flag = false;
  // }
  it('for itemCount function', () => {
    component.itemCount(2);
    expect(component.limit).toBe(2);
    spyOn(component, 'getProducts');
  });
  it('for sort function', () => {
    let name: string = 'name';
    component.sortBy(name);
    expect(component.sort).toBe(name);
  });
  it('for input search function', () => {
    let name: string = 'name';
    component.searchinput(name);
    expect(component.search).toBe('name');
  });
  it('for input search function for else', () => {
    let name: string = '';
    component.searchinput(name);
    expect(component.search).toBe('');
  });
  it('for goto function ', () => {
    component.gotoPage(2);
    expect(component.pagenumber).toEqual(2);
  });
  it('for delete product function ', () => {
    component.deleteProduct(1523);
    // expect(toaster.success).toHaveBeenCalledWith('product.name added to cart');
    Swal.clickConfirm();
    expect(Swal.isVisible()).toBeTruthy();
  });
});
