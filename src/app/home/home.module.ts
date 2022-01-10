import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { HomeSectionAboutUsComponent } from './components/home-section-about-us/home-section-about-us.component';
import { HomeSectionHeroBannerComponent } from './components/home-section-hero-banner/home-section-hero-banner.component';
import { HomeSectionWhyChooseUsComponent } from './components/home-section-why-choose-us/home-section-why-choose-us.component';
import { HomeSectionOurServicesComponent } from './components/home-section-our-services/home-section-our-services.component';
import { HomeSectionContactUsComponent } from './components/home-section-contact-us/home-section-contact-us.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeSectionAboutUsComponent,
    HomeSectionHeroBannerComponent,
    HomeSectionWhyChooseUsComponent,
    HomeSectionOurServicesComponent,
    HomeSectionContactUsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
  ],
})
export class HomeModule {}
