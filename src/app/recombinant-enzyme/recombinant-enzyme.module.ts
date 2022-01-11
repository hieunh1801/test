import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecombinantEnzymeRoutingModule } from './recombinant-enzyme-routing.module';
import { RecombinantEnzymeComponent } from './recombinant-enzyme.component';
import { OverviewComponent } from './components/overview/overview.component';
import { OverviewSectionWhatIsComponent } from './components/overview/components/overview-section-what-is/overview-section-what-is.component';
import { OverviewSectionFeatureAndBenefitComponent } from './components/overview/components/overview-section-feature-and-benefit/overview-section-feature-and-benefit.component';
import { OverviewSectionProductListComponent } from './components/overview/components/overview-section-product-list/overview-section-product-list.component';
import { OverviewSectionProcedureComponent } from './components/overview/components/overview-section-procedure/overview-section-procedure.component';
import { SharedModule } from '@shared/shared.module';
import { OverviewSectionTestComponent } from './components/overview/components/overview-section-test/overview-section-test.component';

@NgModule({
  declarations: [
    RecombinantEnzymeComponent,
    OverviewComponent,
    OverviewSectionWhatIsComponent,
    OverviewSectionFeatureAndBenefitComponent,
    OverviewSectionProductListComponent,
    OverviewSectionProcedureComponent,
    OverviewSectionTestComponent,
  ],
  imports: [CommonModule, RecombinantEnzymeRoutingModule, SharedModule],
})
export class RecombinantEnzymeModule {}
