import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { UserProfilesComponent } from './components/user-profiles/user-profiles.component';
import { AccountSettingComponent } from './components/user-settings/components/account-setting/account-setting.component';
import { EmailAndNotificationSettingComponent } from './components/user-settings/components/email-and-notification-setting/email-and-notification-setting.component';
import { PasswordSettingComponent } from './components/user-settings/components/password-setting/password-setting.component';
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
        canActivate: [AuthGuard],
        children: [
          {
            path: 'email-and-notification',
            component: EmailAndNotificationSettingComponent,
          },
          {
            path: 'password',
            component: PasswordSettingComponent,
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
        canActivate: [AuthGuard],
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
