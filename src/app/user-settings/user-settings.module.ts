import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { UserSettingComponent } from './user-setting.component';


@NgModule({
  declarations: [UserSettingComponent],
  imports: [
    CommonModule,
    UserSettingsRoutingModule
  ]
})
export class UserSettingsModule { }
