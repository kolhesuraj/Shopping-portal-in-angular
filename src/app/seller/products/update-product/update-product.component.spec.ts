import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HotToastService } from '@ngneat/hot-toast';
import { NgxEditorModule } from 'ngx-editor';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';

import { UpdateProductComponent } from './update-product.component';

class httpservice {
  patch(): Observable<any> {
    return of([]);
  }
}

describe('UpdateProductComponent', () => {
  let component: UpdateProductComponent;
  let fixture: ComponentFixture<UpdateProductComponent>;
  let auth: SocialAuthService;
  let http: HttpServiceService;
  let httptestingcontroler: HttpTestingController;
  let dialogref: MatDialogRef<UpdateProductComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateProductComponent],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgxEditorModule,
      ],
      providers: [
        HotToastService,
        { provide: HttpServiceService, useClass: httpservice },
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
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

    fixture = TestBed.createComponent(UpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    auth = TestBed.inject(SocialAuthService);
    http = TestBed.inject(HttpServiceService);
    httptestingcontroler = TestBed.inject(HttpTestingController);
    dialogref = TestBed.inject(MatDialogRef<UpdateProductComponent>);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('logout', () => {
    spyOn(auth, 'signOut');
    component.logout();
  });
  it('updateDetils', fakeAsync(() => {
    component.updateDetils();
    expect(component.updateProductForm.valid).toBeFalse();
    // component.data.name = 'name';
    // component.data.description = 'description';
    // component.data.price = 100;
    // component.updateProductForm.patchValue({
    //   name: component.data.name,
    //   description: component.data.description,
    //   price: component.data.price,
    // });
    // spyOn(component.updateProductForm, 'reset');
    // // spyOn(component._dialogRef, 'close');
    // component.updateDetils();
    // expect(component.updateProductForm.valid).toBeTrue();
    // dialogref.close();
    // // expect(component._dialogRef.close())
  }));
});
