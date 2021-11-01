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
import { PgxComponent } from './components/products/components/pgx/pgx.component';
import { PgxPremiumComponent } from './components/products/components/pgx-premium/pgx-premium.component';
import { SingleGeneServiceComponent } from './components/products/components/single-gene-service/single-gene-service.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PdssComponent,
    OverviewComponent,
    BrowserComponent,
    UtilityComponent,
    ProductsComponent,
    PgxComponent,
    PgxPremiumComponent,
    SingleGeneServiceComponent,
  ],
  imports: [CommonModule, PdssRoutingModule, SharedModule],
})
export class PdssModule {}
