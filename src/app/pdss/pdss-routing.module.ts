import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { BrowserComponent } from '@pdss/components/browser/browser.component';
import { ReportComponent } from '@pdss/components/my-report/components/report/report.component';
import { SummaryReportComponent } from '@pdss/components/my-report/components/summary-report/summary-report.component';
import { MyReportComponent } from '@pdss/components/my-report/my-report.component';
import { OverviewComponent } from '@pdss/components/overview/overview.component';
import { PgxPremiumComponent } from '@pdss/components/products/components/pgx-premium/pgx-premium.component';
import { PgxComponent } from '@pdss/components/products/components/pgx/pgx.component';
import { SingleGeneServiceComponent } from '@pdss/components/products/components/single-gene-service/single-gene-service.component';
import { ProductsComponent } from '@pdss/components/products/products.component';
import { UtilityComponent } from '@pdss/components/utility/utility.component';
import { PdssComponent } from '@pdss/pdss.component';
import { DrugComponent } from '@pdss/components/browser/components/drug/drug.component';
import { GeneComponent } from '@pdss/components/browser/components/gene/gene.component';
import { ReportPreviewComponent } from './components/report-preview/report-preview.component';

const routes: Routes = [
  {
    path: '',
    component: PdssComponent,
    children: [
      {
        path: '',
        component: OverviewComponent,
      },
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
        children: [
          { path: 'pgx', component: PgxComponent },
          { path: 'pgx-premium', component: PgxPremiumComponent },
          {
            path: 'single-gene-service',
            component: SingleGeneServiceComponent,
          },
        ],
      },
      {
        path: 'browser',
        component: BrowserComponent,
      },
      {
        path: 'drug/:id/detail',
        component: DrugComponent,
      },
      {
        path: 'gene/:id/detail',
        component: GeneComponent,
      },
      {
        path: 'utility',
        loadChildren: () =>
          import('./components/utility/utility.module').then(
            (m) => m.UtilityModule
          ),
      },
      {
        path: 'my-report',
        component: MyReportComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'summary',
            component: SummaryReportComponent,
          },
          {
            path: 'reports/:qrCode',
            component: ReportComponent,
          },
          {
            path: '',
            redirectTo: 'summary',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'report-preview/:qrCode',
        component: ReportPreviewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PdssRoutingModule {}
