import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListComponent } from './list/list.component';
import { MatIconModule } from '@angular/material/icon';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ProductComponent } from './product/product.component';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UpdateProductComponent } from './update-product/update-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateImagesComponent } from './update-images/update-images.component';


@NgModule({
  declarations: [ListComponent, AddProductComponent, ProductComponent, UpdateProductComponent, UpdateImagesComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDialogModule
  ],
})
export class ProductsModule {}
