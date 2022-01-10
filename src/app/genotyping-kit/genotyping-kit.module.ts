import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenotypingKitRoutingModule } from './genotyping-kit-routing.module';
import { GenotypingKitComponent } from './genotyping-kit.component';
import { OverviewComponent } from './components/overview/overview.component';
import { OverviewSectionWhatIsComponent } from './components/overview/components/overview-section-what-is/overview-section-what-is.component';
import { OverviewSectionWhyChooseComponent } from './components/overview/components/overview-section-why-choose/overview-section-why-choose.component';
import { OverviewSectionWhenToUseComponent } from './components/overview/components/overview-section-when-to-use/overview-section-when-to-use.component';
import { SharedModule } from '@shared/shared.module';
import { OverviewSectionWhereToUseComponent } from './components/overview/components/overview-section-where-to-use/overview-section-where-to-use.component';
import { OverviewSectionProcedureComponent } from './components/overview/components/overview-section-procedure/overview-section-procedure.component';

@NgModule({
  declarations: [
    GenotypingKitComponent,
    OverviewComponent,
    OverviewSectionWhatIsComponent,
    OverviewSectionWhyChooseComponent,
    OverviewSectionWhenToUseComponent,
    OverviewSectionWhereToUseComponent,
    OverviewSectionProcedureComponent,
  ],
  imports: [CommonModule, GenotypingKitRoutingModule, SharedModule],
})
export class GenotypingKitModule {}
