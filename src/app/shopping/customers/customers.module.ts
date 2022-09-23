import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { MatIconModule } from '@angular/material/icon';
import { EditPictureComponent } from './edit-picture/edit-picture.component';


@NgModule({
  declarations: [
    ProfileComponent,
    EditPictureComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MatIconModule
  ]
})
export class CustemersModule { }
