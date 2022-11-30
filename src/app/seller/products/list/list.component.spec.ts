import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterTestingModule } from '@angular/router/testing';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';
import { AuthenticationModule } from '../../authentication/authentication.module';

import { ListComponent } from './list.component';

const data = {
  user: 1,
};
class httpservice {
  get(url: string) {
    return of(data);
  }
  delete(url: string, body: any): Observable<any> {
    return of(data);
  }
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let http: HttpServiceService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [HttpClientModule, RouterTestingModule, MatAutocompleteModule],
      providers: [
        HotToastService,
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
    fixture.detectChanges();
    http = TestBed.inject(HttpServiceService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('for logout function', () => {
    component.logout();
  });
  it('for Goto Product function', () => {
    component.gotoproduct(1);
  });
  it('for itemCount function', () => {
    component.itemCount(2);
  });
  it('for sort function', () => {
    let name: string = 'name';
    component.sortBy(name);
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
  });
  it('for delete product function ', () => {
  
    component.deleteProduct(1523);
    expect(Swal.isVisible()).toBeTruthy();
    // expect(Swal.getTitle().textContent).toEqual('Are you sure?');
    Swal.clickConfirm();
  });
});
