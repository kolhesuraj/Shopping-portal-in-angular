import { NgModule } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationVarifyEmailComponent } from './registration-varify-email/registration-varify-email.component';
import { RegistrationComponent } from './registration/registration.component';
import { VarifyEmailComponent } from './varify-email/varify-email.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path:'verify-email', component:VarifyEmailComponent },
  { path: 'email-varify', component: RegistrationVarifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
