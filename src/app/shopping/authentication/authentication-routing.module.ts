import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGaurdGuard } from '../services/Guard/login-gaurd.guard';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGaurdGuard] },
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [LoginGaurdGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
