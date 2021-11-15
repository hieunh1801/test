import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfilesComponent } from './components/user-profiles/user-profiles.component';
import { AccountSettingComponent } from './components/user-settings/components/account-setting/account-setting.component';
import { EmailAndNotificationSettingComponent } from './components/user-settings/components/email-and-notification-setting/email-and-notification-setting.component';
import { ResetPasswordSettingComponent } from './components/user-settings/components/reset-password-setting/reset-password-setting.component';
import { UserSettingComponent } from './components/user-settings/user-setting.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'settings',
        component: UserSettingComponent,
        children: [
          {
            path: 'email-and-notification',
            component: EmailAndNotificationSettingComponent,
          },
          {
            path: 'password',
            component: ResetPasswordSettingComponent,
          },
          { path: 'account', component: AccountSettingComponent },
          {
            path: '',
            redirectTo: 'email-and-notification',
          },
        ],
      },
      {
        path: 'profiles',
        component: UserProfilesComponent,
      },
      {
        path: '',
        redirectTo: 'profiles',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
