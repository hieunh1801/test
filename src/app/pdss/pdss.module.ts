import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdssRoutingModule } from './pdss-routing.module';
import { PdssComponent } from './pdss.component';
import { OverviewComponent } from './components/overview/overview.component';
import { BrowserComponent } from './components/browser/browser.component';
import { UtilityComponent } from './components/utility/utility.component';
import { ProductsComponent } from './components/products/products.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    PdssComponent,
    OverviewComponent,
    BrowserComponent,
    UtilityComponent,
    ProductsComponent,
  ],
  imports: [CommonModule, PdssRoutingModule, MaterialModule, FlexLayoutModule],
})
export class PdssModule {}
