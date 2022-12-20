import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductLayoutComponent } from './product-layout/product-layout.component';
import { RouterModule } from '@angular/router';
import { ProductsModule } from '../products.module';



@NgModule({
  declarations: [
    ProductLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProductsModule
  ]
})
export class LayoutModule { }
