import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AddUserComponent } from './add-user/add-user.component';
import { OrganizationComponent } from './organization/organization.component';

@NgModule({
  declarations: [HomePageComponent, EditProfileComponent, AddUserComponent, OrganizationComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatIconModule
  ],
})
export class ProfileModule {}
