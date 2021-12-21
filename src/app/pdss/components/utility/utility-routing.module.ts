import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilityRoutingModule {}
