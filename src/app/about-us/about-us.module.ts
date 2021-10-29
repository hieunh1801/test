import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CertificateListComponent } from './components/certificate-list/certificate-list.component';
import { SharedModule } from '../shared/shared.module';
import { HistoryComponent } from './components/history/history.component';

@NgModule({
  declarations: [AboutUsComponent, CertificateListComponent, HistoryComponent],
  imports: [CommonModule, AboutUsRoutingModule, FlexLayoutModule, SharedModule],
})
export class AboutUsModule {}
