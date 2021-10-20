import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmeComponent } from './adme.component';

const routes: Routes = [
  {
    path: '',
    component: AdmeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmeRoutingModule {}
