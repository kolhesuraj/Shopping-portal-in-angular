import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDeatailsComponent } from './order-deatails/order-deatails.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
  { path: '', component: OrderHistoryComponent, pathMatch: 'full' },
  { path: 'order-deatails/:id', component: OrderDeatailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
