import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component'

const routes: Routes = [
  { path: '', redirectTo:'home-page', pathMatch: 'full' },
  { path: 'home-page', component: HomePageComponent },
  { path: 'edit-profile', component: EditProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
