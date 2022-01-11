import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { AdmeRoutingModule } from './adme-routing.module';
import { AdmeComponent } from './adme.component';
import { OverviewComponent } from './components/overview/overview.component';
import { OverviewSectionWhatIsComponent } from './components/overview/components/overview-section-what-is/overview-section-what-is.component';
import { OverviewSectionWhyComponent } from './components/overview/components/overview-section-why/overview-section-why.component';
import { OverviewSectionWhenComponent } from './components/overview/components/overview-section-when/overview-section-when.component';
import { OverviewSectionProcedureComponent } from './components/overview/components/overview-section-procedure/overview-section-procedure.component';
import { OverviewSectionServicesComponent } from './components/overview/components/overview-section-services/overview-section-services.component';

@NgModule({
  declarations: [
    AdmeComponent,
    OverviewComponent,
    OverviewSectionWhatIsComponent,
    OverviewSectionWhyComponent,
    OverviewSectionWhenComponent,
    OverviewSectionProcedureComponent,
    OverviewSectionServicesComponent,
  ],
  imports: [CommonModule, AdmeRoutingModule, SharedModule],
})
export class AdmeModule {}
