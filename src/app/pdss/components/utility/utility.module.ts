import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilityRoutingModule } from './utility-routing.module';
import { UtilityComponent } from './utility.component';
import { UtilityNavMenuComponent } from './components/utility-nav-menu/utility-nav-menu.component';
import { SharedModule } from '@shared/shared.module';
import { AtcClassificationComponent } from './components/atc-classification/atc-classification.component';
import { AtcDrugTreeComponent } from './components/atc-classification/components/atc-drug-tree/atc-drug-tree.component';
import { AtcClassificationV2Component } from './components/atc-classification-v2/atc-classification-v2.component';
import { AtcDrugTreeV2Component } from './components/atc-classification-v2/components/atc-drug-tree-v2/atc-drug-tree-v2.component';
import { AtcClassificationV3Component } from './components/atc-classification-v3/atc-classification-v3.component';

@NgModule({
  declarations: [
    UtilityComponent,
    UtilityNavMenuComponent,
    AtcClassificationComponent,
    AtcDrugTreeComponent,
    AtcClassificationV2Component,
    AtcDrugTreeV2Component,
    AtcClassificationV3Component,
  ],
  imports: [CommonModule, UtilityRoutingModule, SharedModule],
})
export class UtilityModule {}
