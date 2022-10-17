import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartGuardGuard } from '../services/cart-guard.guard';
import { CartComponent } from './cart/cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [CartGuardGuard],
  },
  {
    path: 'check-out/:isCart',
    component: CheckOutComponent,
    canActivate: [CartGuardGuard],
  },
  { path: 'cart', component: CartComponent },
  { path: 'payment/:id', component: PaymentsComponent },
  { path: 'order/:id', component: OrderDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
