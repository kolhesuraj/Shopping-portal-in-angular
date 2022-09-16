import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListComponent } from './list/list.component';
import { MatIconModule } from '@angular/material/icon';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ProductComponent } from './product/product.component';


@NgModule({
  declarations: [ListComponent, AddProductComponent, ProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class ProductsModule {}
