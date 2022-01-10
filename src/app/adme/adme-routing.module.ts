import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmeComponent } from './adme.component';
import { OverviewComponent } from './components/overview/overview.component';

const routes: Routes = [
  {
    path: '',
    component: AdmeComponent,
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
export class AdmeRoutingModule {}
