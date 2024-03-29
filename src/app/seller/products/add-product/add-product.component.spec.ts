import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HotToastService } from '@ngneat/hot-toast';
import { NgxEditorModule } from 'ngx-editor';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';

import { AddProductComponent } from './add-product.component';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        NgxEditorModule,
      ],
      providers: [
        HotToastService,
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

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('add product with invalid form', () => {
    component.addProduct();
    expect(component.addProductForm.invalid).toBeTrue();
  });

  it('add product with valid form', () => {
    component.addProductForm.patchValue({
      name: 'name',
      description: 'Description',
      price: '100',
    });
    component.addProduct();
    expect(component.addProductForm.valid).toBeTrue();
    expect(component.incomplete).toBeFalse();
    expect(component.updating).toBeTrue();
  });

  it('one line functions', () => {
    component.logout();
    component.cancel();
  });
  it('select method', () => {
    const a: any = {
      addedFiles: 'file',
    };
    spyOn(component.files, 'push');
    component.onSelect(a);
    expect(component.files.push).toHaveBeenCalled();
  });
  it('remove method', () => {
    spyOn(component.files, 'splice');
    component.onRemove(1);
    expect(component.files.splice).toHaveBeenCalled();
  });
});
