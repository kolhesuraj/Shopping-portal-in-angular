import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { NgDompurifyModule } from '@tinkoff/ng-dompurify';


@NgModule({
  declarations: [],
  imports: [CommonModule, SellerRoutingModule, NgDompurifyModule],
})
export class SellerModule {}
