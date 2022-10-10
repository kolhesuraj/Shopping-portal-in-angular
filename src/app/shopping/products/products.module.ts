import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { DetailsComponent } from './details/details.component';
import { MatIconModule } from '@angular/material/icon';
import { NgDompurifyModule } from '@tinkoff/ng-dompurify';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ListComponent } from './list/list.component';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [DetailsComponent, ListComponent, HeaderComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatIconModule,
    NgDompurifyModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatOptionModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class ProductsModule {}
