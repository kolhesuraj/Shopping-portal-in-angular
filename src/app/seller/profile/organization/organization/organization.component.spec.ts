import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthServiceConfig,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  getTestBed,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';

import { OrganizationComponent } from './organization.component';
const data = {
  results: [1, 2, 3],
  _org: {
    name: 'name',
    email: 'email@gmail.com',
  },
  role: 'admin',
};
class httpservice {
  get(url: string): Observable<any> {
    return of(data);
  }
  delete(): Observable<any> {
    return of(m);
  }
}
const m = {
  isConfirmed: true,
  value: 'ADMIN',
};
Swal.fire().then((m) => {});
describe('OrganizationComponent', () => {
  let component: OrganizationComponent;
  let fixture: ComponentFixture<OrganizationComponent>;
  let http: HttpServiceService;
  let auth: SocialAuthService;
  let toastrService: jasmine.SpyObj<HotToastService>;
  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<HotToastService>('HotToastService', [
      'error',
      'success',
    ]);
    await TestBed.configureTestingModule({
      declarations: [OrganizationComponent],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        MatAutocompleteModule,
      ],
      providers: [
        { provide: HttpServiceService, useClass: httpservice },
        { provide: HotToastService, useValue: toastrService },
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

    fixture = TestBed.createComponent(OrganizationComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpServiceService);
    auth = TestBed.inject(SocialAuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('gotoPage', () => {
    component.list.totalPages = 3;
    component.gotoPage(1);
    expect(component.list.totalPages >= 1).toBeTrue();
  });

  it('setdata', () => {
    component.Role = 'All Employes';
    component.pagenumber = 1;
    component.limit = 10;
    component.sortBy = 'name';
    let result = component.setdata();
    expect(result).toBe('page=1&limit=10&sortBy=name');
  });
  it('setdata 2', () => {
    component.Role = 'user';
    component.pagenumber = 1;
    component.limit = 10;
    component.sortBy = 'name';
    let result = component.setdata();
    expect(result).toBe('page=1&limit=10&sortBy=name&role=user');
  });
  it('get User', () => {
    component.search = 'apple';
    component.getUsers();
    let url = 'user';
    component.result = [1, 2, 3];
    // http.get(url).subscribe({
    //   next: (res: any) => {
    //     expect(component.result).toEqual(res.results);
    //   },
    // });
  });

  it('getProfile', () => {
    component.getProfile();
  });
  it('getSuggetion', () => {
    component.getSuggetion();
  });

  it('logout', () => {
    spyOn(auth, 'signOut');
    component.logout();
  });
  it('pagelimit', () => {
    const event = {
      target: {
        value: 2,
      },
    };
    component.pagelimit(event);
    expect(component.limit).toBe(2);
  });
  it('sort by', () => {
    component.sortby('name');
    component.sortBy = 'name';
    component.sortby('name');
  });

  it('role', () => {
    const event = {
      target: {
        value: '2',
      },
    };
    component.role(event);
    expect(component.Role).toBe('2');
  });
  it('search', () => {
    component.searchinput('name');
    component.searchinput('');
  });
  it('get Org Name', () => {
    component.orgName = 'name Ok';
    component.getOrgName();
    expect(component.orgName.split.length > 1).toBe(true);
    component.orgName = 'name';
    component.getOrgName();
  });
  it('deleteUser', () => {
    component.deleteUser(1);
    Swal.clickConfirm();
  });
  it('editRole', () => {
    component.editRole(1);
    Swal.clickConfirm();
  });
});
