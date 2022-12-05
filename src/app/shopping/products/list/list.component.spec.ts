import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HotToastService } from '@ngneat/hot-toast';
import { StoreModule } from '@ngrx/store';
import { NgDompurifyModule } from '@tinkoff/ng-dompurify';
import * as DOMPurify from 'dompurify';
import { Observable, of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http/http-service.service';

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
  get(url: string): Observable<any> {
    return of(data);
  }
}

const product = {
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
};

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let toastrService: jasmine.SpyObj<HotToastService>;
  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<HotToastService>('HotToastService', [
      'info',
      'success',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}),
        MatAutocompleteModule,
        NgDompurifyModule,
      ],
      providers: [
        { provide: HotToastService, useValue: toastrService },
        {
          provide: HttpServiceService,
          useClass: httpservice,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('get Products', () => {
    component.getProducts();
    component.search = 'name';
    component.getProducts();
    expect(component.list).toEqual(data);
  });
  it('item per page', () => {
    component.itemCount(24);
    expect(component.limit).toEqual(24);
  });
  it('sort result ', () => {
    component.sortBy('name');
    expect(component.sort).toEqual('name');
  });
  it('change page ', () => {
    component.gotoPage(2);
    expect(component.pagenumber).toEqual(2);
  });
  it('search in results ', () => {
    component.searchinput('apple');
    expect(component.search).toEqual('apple');
    const search = '';
    component.searchinput(search);
    expect(component.search).toEqual('');
  });
  it('is in cart', () => {
    component.cart = [product];
    component.isInCart(product);
    expect(toastrService.info).toHaveBeenCalledWith(
      'product.name  already in cart'
    );
  });
  it('add product to cart', () => {
    component.addToCart(product);
    expect(toastrService.success).toHaveBeenCalledWith(
      'product.name added to cart'
    );
  });
    it('add product to cart', () => {
      component.BuyNow(product);
    });
});
