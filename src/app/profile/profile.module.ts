import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { MaterialModule } from '../material/material.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [HomePageComponent, EditProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, MaterialModule],
})
export class ProfileModule {}
