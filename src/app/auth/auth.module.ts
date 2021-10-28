import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RequestPasswordComponent } from './components/request-password/request-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterStep1Component } from './components/register/components/register-step1/register-step1.component';
import { RegisterStep2Component } from './components/register/components/register-step2/register-step2.component';
import { RegisterStep3Component } from './components/register/components/register-step3/register-step3.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    RequestPasswordComponent,
    ResetPasswordComponent,
    AuthComponent,
    RegisterStep1Component,
    RegisterStep2Component,
    RegisterStep3Component,
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
