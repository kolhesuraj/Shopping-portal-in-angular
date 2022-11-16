import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderDeatailsComponent } from './order-deatails/order-deatails.component';
import { MatIconModule } from '@angular/material/icon';
import { OrderNavComponent } from './order-nav/order-nav.component';

@NgModule({
  declarations: [OrderHistoryComponent, OrderDeatailsComponent, OrderNavComponent],
  imports: [CommonModule, OrderRoutingModule, MatIconModule],
})
export class OrderModule {}
