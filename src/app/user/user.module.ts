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
import { IntroductionComponent } from './components/user-profiles/components/introduction/introduction.component';
import { MedicalHistoryComponent } from './components/user-profiles/components/medical-history/medical-history.component';
import { MedicalHistoryListComponent } from './components/user-profiles/components/medical-history/components/medical-history-list/medical-history-list.component';
import { MedicalHistoryFormComponent } from './components/user-profiles/components/medical-history/components/medical-history-form/medical-history-form.component';
import { DiseaseHistoryComponent } from './components/user-profiles/components/disease-history/disease-history.component';
import { DiseaseHistoryFormComponent } from './components/user-profiles/components/disease-history/components/disease-history-form/disease-history-form.component';
import { DiseaseHistoryListComponent } from './components/user-profiles/components/disease-history/components/disease-history-list/disease-history-list.component';
import { BasicInformationComponent } from './components/user-profiles/components/basic-information/basic-information.component';
import { BasicInformationDetailComponent } from './components/user-profiles/components/basic-information/components/basic-information-detail/basic-information-detail.component';
import { BasicInformationFormComponent } from './components/user-profiles/components/basic-information/components/basic-information-form/basic-information-form.component';
import { BasicInformationListComponent } from './components/user-profiles/components/basic-information/components/basic-information-list/basic-information-list.component';
import { IntroductionDetailComponent } from './components/user-profiles/components/introduction/components/introduction-detail/introduction-detail.component';
import { IntroductionFormComponent } from './components/user-profiles/components/introduction/components/introduction-form/introduction-form.component';
import { LifeStyleComponent } from './components/user-profiles/components/life-style/life-style.component';
import { LifeStyleDetailComponent } from './components/user-profiles/components/life-style/components/life-style-detail/life-style-detail.component';
import { LifeStyleListComponent } from './components/user-profiles/components/life-style/components/life-style-list/life-style-list.component';
import { LifeStyleFormComponent } from './components/user-profiles/components/life-style/components/life-style-form/life-style-form.component';
import { JoyrideModule } from 'ngx-joyride';
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
    IntroductionComponent,
    MedicalHistoryComponent,
    LifeStyleComponent,
    MedicalHistoryListComponent,
    DiseaseHistoryComponent,
    DiseaseHistoryFormComponent,
    DiseaseHistoryListComponent,
    BasicInformationComponent,
    BasicInformationDetailComponent,
    BasicInformationFormComponent,
    BasicInformationListComponent,
    IntroductionDetailComponent,
    IntroductionFormComponent,
    MedicalHistoryFormComponent,
    LifeStyleDetailComponent,
    LifeStyleListComponent,
    LifeStyleFormComponent,
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule, JoyrideModule],
})
export class UserModule {}
