import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HotToastService } from '@ngneat/hot-toast';
import { NgDompurifyPipe } from '@tinkoff/ng-dompurify';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

import { ProductComponent } from './product.component';

const data = {
  user: 1,
};

class httpservice {
  get(url: string): Observable<any> {
    return of(data);
  }
  delete(): Observable<any> {
    return of(data);
  }
}

class dialogclass {
  open(): Observable<any> {
    return of(data);
  }
}
const m = {
  isConfirmed: true,
};
Swal.fire({}).then((m) => {});

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let http: HttpServiceService;
  let dialog: MatDialog;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent, NgDompurifyPipe],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'products', component: ProductComponent },
        ]),
        MatDialogModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        HotToastService,
        { provide: MatDialog, useClass: dialogclass },
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

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    http = TestBed.inject(HttpServiceService);
    dialog = TestBed.inject(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('logout create', () => {
    component.logout();
  });
  // it('update method', () => {
  //   spyOn(dialog, 'open');
  //   component.update();
  //   let dialogRef = fixture.componentRef.location.nativeElement.dialog
  //   dialogRef.afterClosed;
  //   expect(component.getDetails()).toHaveBeenCalled();
  // });
  // it('update Image', () => {
  //   spyOn(dialog, 'open')
  //   component.updateImages();
  // })
  it('delete product', fakeAsync(() => {
    // spyOn(Router, 'navigate');
    component.deleteProduct();
    Swal.clickConfirm();
    tick(5000);
  }));
});
