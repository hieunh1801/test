import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilityRoutingModule } from './utility-routing.module';
import { UtilityComponent } from './utility.component';
import { UtilityNavMenuComponent } from './components/utility-nav-menu/utility-nav-menu.component';
import { SharedModule } from '@shared/shared.module';
import { AtcClassificationComponent } from './components/atc-classification/atc-classification.component';

@NgModule({
  declarations: [UtilityComponent, UtilityNavMenuComponent, AtcClassificationComponent],
  imports: [CommonModule, UtilityRoutingModule, SharedModule],
})
export class UtilityModule {}
