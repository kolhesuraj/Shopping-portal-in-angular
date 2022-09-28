import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { DetailsComponent } from './details/details.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatIconModule
  ]
})
export class ProductsModule { }
