import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtcClassificationV2Component } from './components/atc-classification-v2/atc-classification-v2.component';
import { AtcClassificationV3Component } from './components/atc-classification-v3/atc-classification-v3.component';
import { AtcClassificationComponent } from './components/atc-classification/atc-classification.component';
import { UtilityComponent } from './utility.component';

const routes: Routes = [
  {
    path: '',
    component: UtilityComponent,
    children: [
      {
        path: 'atc-classification',
        component: AtcClassificationComponent,
      },
      {
        path: 'atc-classification-v2',
        component: AtcClassificationV2Component,
      },
      {
        path: 'atc-classification-v3',
        component: AtcClassificationV3Component,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilityRoutingModule {}
