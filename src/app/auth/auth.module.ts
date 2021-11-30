import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RequestPasswordComponent } from './components/request-password/request-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthComponent } from './auth.component';
import { SharedModule } from '@shared/shared.module';
import { RegisterSuccessDialogComponent } from './components/register/components/register-success-dialog/register-success-dialog.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    RequestPasswordComponent,
    ResetPasswordComponent,
    AuthComponent,
    RegisterSuccessDialogComponent,
    RegisterSuccessComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
