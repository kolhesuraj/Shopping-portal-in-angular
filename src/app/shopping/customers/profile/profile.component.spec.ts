import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import Swal from 'sweetalert2';
import { ProfileComponent } from './profile.component';
const m = [
  {
    iscomfirmed: true,
    Picture: 1,
    name: 1,
    email: 1,
  },
  {
    addressLine2: 'At.Po. Loni Haveli Tel-Parner',
    city: 'Loni Haveli Tel- parner Dist- Ahmednagar',
    pin: '414302',
    state: 'Maharashtra',
    street: 'khadakwadi',
    _id: '6335265a40fbae2df50b4ed7',
  },
  {
    productId: 'product._id',
    name: 'product.name',
    price: 100,
    qty: 1,
    subTotal: 1200,
    images: [
      {
        public_id: 'training-api/ea0vq1fvxycr2ciw9jvt',
        url: 'http://res.cloudinary.com/abs-am/image/upload/v1661252738/training-api/ea0vq1fvxycr2ciw9jvt.jpg',
      },
    ],
  },
];
Swal.fire().then((m) => {});
class httpservice {
  get(url: string): Observable<any> {
    return of(m);
  }
  patch(url: string, body: any): Observable<any> {
    return of([m]);
  }
  delete(url: string): Observable<any> {
    return of([m]);
  }
}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        MatDialogModule,
      ],
      providers: [
        HotToastService,
        { provider: HttpServiceService, useClass: httpservice },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('cancelOrder', () => {
    component.cancelOrder('1');
    Swal.clickConfirm();
  });
  it('delete address', () => {
    component.deleteAddress('1');
    Swal.clickConfirm();
  });
  it('delete profile', () => {
    localStorage.setItem('token', 'token');
    component.deleteProfile();
    Swal.clickConfirm();
    // expect(localStorage.getItem('token')).toBeNull();
  });
  it('get address', () => {
    component.getAddresses();
  });
  it('get profile', () => {
    component.getProfile();
  });
  it('logout', () => {
    component.Logout();
    expect(localStorage.getItem('token')).toBeNull();
  });
  it('got to page and classes', () => {
    component.gotoPage(1);
    expect(component.pagenumber).toBe(1);
    // component.AddNavClass();
    // component.removeNavClass();
  });
});
