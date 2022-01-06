import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdssRoutingModule } from './pdss-routing.module';
import { PdssComponent } from './pdss.component';
import { OverviewComponent } from './components/overview/overview.component';
import { BrowserComponent } from './components/browser/browser.component';
import { ProductsComponent } from './components/products/products.component';
import { PgxComponent } from './components/products/components/pgx/pgx.component';
import { PgxPremiumComponent } from './components/products/components/pgx-premium/pgx-premium.component';
import { SingleGeneServiceComponent } from './components/products/components/single-gene-service/single-gene-service.component';
import { PdssNavMenuComponent } from './components/pdss-nav-menu/pdss-nav-menu.component';
import { MyReportComponent } from './components/my-report/my-report.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { SummaryReportComponent } from './components/my-report/components/summary-report/summary-report.component';
import { ReportComponent } from './components/my-report/components/report/report.component';
import { SummaryPackageTableComponent } from './components/my-report/components/summary-report/components/summary-package-table/summary-package-table.component';
import { SharedModule } from '@shared/shared.module';
import { ReportGeneticResultTableComponent } from './components/my-report/components/report/components/report-genetic-result-table/report-genetic-result-table.component';
import { ReportAdditionalInformationListComponent } from './components/my-report/components/report/components/report-additional-information-list/report-additional-information-list.component';
import { DrugRecommendationTableComponent } from './components/my-report/components/drug-recommendation-table/drug-recommendation-table.component';
import { DrugRecommendationTableRowExpandedComponent } from './components/my-report/components/drug-recommendation-table/components/drug-recommendation-table-row-expanded/drug-recommendation-table-row-expanded.component';
import { DrugGeneInterpretationTableComponent } from './components/my-report/components/drug-recommendation-table/components/drug-recommendation-table-row-expanded/components/drug-gene-interpretation-table/drug-gene-interpretation-table.component';
import { DrugGeneInterpretationListComponent } from './components/my-report/components/drug-recommendation-table/components/drug-recommendation-table-row-expanded/components/drug-gene-interpretation-list/drug-gene-interpretation-list.component';
import { ReferenceListDialogComponent } from './components/my-report/components/drug-recommendation-table/components/drug-recommendation-table-row-expanded/components/reference-list-dialog/reference-list-dialog.component';
import { DrugTableStatisticComponent } from './components/my-report/components/drug-recommendation-table/components/drug-table-statistic/drug-table-statistic.component';
import { GeneComponent } from './components/browser/components/gene/gene.component';
import { DrugComponent } from './components/browser/components/drug/drug.component';
import { ReportPreviewComponent } from './components/report-preview/report-preview.component';
import { ReportInformationRequestDialogComponent } from './components/report-preview/components/report-information-request-dialog/report-information-request-dialog.component';
import { SectionPdssCommonProgressComponent } from './components/overview/components/section-pdss-common-progress/section-pdss-common-progress.component';

@NgModule({
  declarations: [
    PdssComponent,
    OverviewComponent,
    BrowserComponent,
    ProductsComponent,
    PgxComponent,
    PgxPremiumComponent,
    SingleGeneServiceComponent,
    PdssNavMenuComponent,
    MyReportComponent,
    DrugRecommendationTableComponent,
    DrugRecommendationTableRowExpandedComponent,
    DrugGeneInterpretationTableComponent,
    DrugGeneInterpretationListComponent,
    ReferenceListDialogComponent,
    SummaryReportComponent,
    ReportComponent,
    SummaryPackageTableComponent,
    DrugTableStatisticComponent,
    ReportGeneticResultTableComponent,
    ReportAdditionalInformationListComponent,
    DrugRecommendationTableComponent,
    GeneComponent,
    DrugComponent,
    ReportPreviewComponent,
    ReportInformationRequestDialogComponent,
    SectionPdssCommonProgressComponent,
  ],
  imports: [CommonModule, PdssRoutingModule, SharedModule, NgxEchartsModule],
})
export class PdssModule {}
