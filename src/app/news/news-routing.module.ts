import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
  },
  {
    path: ':id/detail',
    component: NewsDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
