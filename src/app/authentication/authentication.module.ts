import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { VarifyEmailComponent } from '../varify-email/varify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
// import { SocialLoginModule } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    VarifyEmailComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    // SocialLoginModule
  ],
})
export class AuthenticationModule {}
