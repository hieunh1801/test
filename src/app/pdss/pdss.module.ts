import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdssRoutingModule } from './pdss-routing.module';
import { PdssComponent } from './pdss.component';
import { OverviewComponent } from './components/overview/overview.component';
import { BrowserComponent } from './components/browser/browser.component';
import { UtilityComponent } from './components/utility/utility.component';
import { ProductsComponent } from './components/products/products.component';
import { PgxComponent } from './components/products/components/pgx/pgx.component';
import { PgxPremiumComponent } from './components/products/components/pgx-premium/pgx-premium.component';
import { SingleGeneServiceComponent } from './components/products/components/single-gene-service/single-gene-service.component';
import { SharedModule } from '../shared/shared.module';
import { PdssNavMenuComponent } from './components/pdss-nav-menu/pdss-nav-menu.component';
import { MyReportComponent } from './components/my-report/my-report.component';
import { DrugTableComponent } from './components/my-report/components/drug-table/drug-table.component';
import { RowExpandedComponent } from './components/my-report/components/drug-table/components/row-expanded/row-expanded.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { RiskSummaryPieChartComponent } from './components/my-report/components/risk-summary-pie-chart/risk-summary-pie-chart.component';
import { DrugGeneInterpretationTableComponent } from './components/my-report/components/drug-table/components/row-expanded/components/drug-gene-interpretation-table/drug-gene-interpretation-table.component';
import { DrugGeneInterpretationListComponent } from './components/my-report/components/drug-table/components/row-expanded/components/drug-gene-interpretation-list/drug-gene-interpretation-list.component';
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
    PdssNavMenuComponent,
    MyReportComponent,
    DrugTableComponent,
    RowExpandedComponent,
    RiskSummaryPieChartComponent,
    DrugGeneInterpretationTableComponent,
    DrugGeneInterpretationListComponent,
  ],
  imports: [CommonModule, PdssRoutingModule, SharedModule, NgxEchartsModule],
})
export class PdssModule {}
