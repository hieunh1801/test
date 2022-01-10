import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { GenotypingKitComponent } from './genotyping-kit.component';

const routes: Routes = [
  {
    path: '',
    component: GenotypingKitComponent,
    children: [
      {
        path: '',
        component: OverviewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenotypingKitRoutingModule {}
