import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductLayoutComponent } from './products/layout';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    component: ProductLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./products/products.module').then((m) => m.ProductsModule),
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./customers/customers.module').then((m) => m.CustemersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingRoutingModule {}
