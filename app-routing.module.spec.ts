import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from './src/app/app-routing.module';
import { PageNotFoundComponent } from './src/app/page-not-found/page-not-found.component';
const routes: Routes = [
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  {
    path: 'shop',
    loadChildren: () =>
      import('./src/app/shopping/shopping.module').then((m) => m.ShoppingModule),
  },
  {
    path: 'seller',
    loadChildren: () =>
      import('./src/app/seller/seller.module').then((m) => m.SellerModule),
  },
  { path: '**', component: PageNotFoundComponent },
];
describe('app-routing', () => {
  let component: AppRoutingModule;
  let fixture: ComponentFixture<AppRoutingModule>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterModule, RouterTestingModule.withRoutes(routes)],
      declarations: [AppRoutingModule],
      providers: [AppRoutingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AppRoutingModule);
    component = fixture.componentInstance;
  });

  it('should create the app-routing', () => {
    expect(component).toBeTruthy();
  });
});
