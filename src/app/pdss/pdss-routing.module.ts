import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserComponent } from './components/browser/browser.component';
import { MyReportComponent } from './components/my-report/my-report.component';
import { OverviewComponent } from './components/overview/overview.component';
import { PgxPremiumComponent } from './components/products/components/pgx-premium/pgx-premium.component';
import { PgxComponent } from './components/products/components/pgx/pgx.component';
import { SingleGeneServiceComponent } from './components/products/components/single-gene-service/single-gene-service.component';
import { ProductsComponent } from './components/products/products.component';
import { UtilityComponent } from './components/utility/utility.component';
import { PdssComponent } from './pdss.component';
import { MyReportResolverService } from './services/my-report-resolver.service';

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
        path: 'utility',
        component: UtilityComponent,
      },
      {
        path: 'my-report',
        component: MyReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PdssRoutingModule {}
