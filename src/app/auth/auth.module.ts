import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RequestPasswordComponent } from './components/request-password/request-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthComponent } from './auth.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, LogoutComponent, RequestPasswordComponent, ResetPasswordComponent, AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
