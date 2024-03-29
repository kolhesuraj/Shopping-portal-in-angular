import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { UpdateOrgComponent } from './organization/update-org/update-org.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AddUserComponent } from './organization/add-user/add-user.component';
import { OrganizationComponent } from './organization/organization/organization.component';
import { EditUserComponent } from './organization/edit-user/edit-user.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [
    HomePageComponent,
    UpdateOrgComponent,
    AddUserComponent,
    OrganizationComponent,
    EditUserComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  bootstrap: [OrganizationComponent],
})
export class ProfileModule {}
