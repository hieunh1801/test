import { RecombinantEnzymeComponent } from './recombinant-enzyme.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';

const routes: Routes = [
  {
    path: '',
    component: RecombinantEnzymeComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: '',
        redirectTo: 'overview',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecombinantEnzymeRoutingModule {}
