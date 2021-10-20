import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserComponent } from './components/browser/browser.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ProductsComponent } from './components/products/products.component';
import { UtilityComponent } from './components/utility/utility.component';
import { PdssComponent } from './pdss.component';

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
      },
      {
        path: 'browser',
        component: BrowserComponent,
      },
      {
        path: 'utility',
        component: UtilityComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PdssRoutingModule {}
