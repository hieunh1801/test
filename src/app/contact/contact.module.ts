import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { JoyrideModule } from 'ngx-joyride';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { LocationsComponent } from './components/locations/locations.component';
import { SharedModule } from '@shared/shared.module';
import { AnimationModule } from '@animation/animation.module';
@NgModule({
  declarations: [
    ContactComponent,
    ContactInformationComponent,
    LocationsComponent,
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    JoyrideModule,
    SharedModule,
    AnimationModule,
  ],
})
export class ContactModule {}
