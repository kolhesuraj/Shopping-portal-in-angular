import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddUserComponent } from './add-user/add-user.component';
import { OrganizationComponent } from './organization/organization.component';

const routes: Routes = [
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: 'home-page', component: HomePageComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'org', component: OrganizationComponent },
  { path: 'org/addUser', component: AddUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
