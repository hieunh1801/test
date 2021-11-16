import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserSettingComponent } from './components/user-settings/user-setting.component';
import { UserComponent } from './user.component';
import { UserProfilesComponent } from './components/user-profiles/user-profiles.component';
import { UserSettingsNavigationMenuComponent } from './components/user-settings/components/user-settings-navigation-menu/user-settings-navigation-menu.component';
import { AccountSettingComponent } from './components/user-settings/components/account-setting/account-setting.component';
import { EmailAndNotificationSettingComponent } from './components/user-settings/components/email-and-notification-setting/email-and-notification-setting.component';
import { SharedModule } from '@shared/shared.module';
import { ChangePasswordComponent } from './components/user-settings/components/password-setting/components/change-password/change-password.component';
import { PasswordSettingComponent } from './components/user-settings/components/password-setting/password-setting.component';
import { CloseAccountComponent } from './components/user-settings/components/account-setting/components/close-account/close-account.component';

@NgModule({
  declarations: [
    UserSettingComponent,
    UserComponent,
    UserProfilesComponent,
    UserSettingsNavigationMenuComponent,
    AccountSettingComponent,
    EmailAndNotificationSettingComponent,
    PasswordSettingComponent,
    ChangePasswordComponent,
    CloseAccountComponent,
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
