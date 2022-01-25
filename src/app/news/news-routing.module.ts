import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsDetailV2Component } from './components/news-detail-v2/news-detail-v2.component';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
    children: [
      {
        path: '',
        component: NewsListComponent,
      },
      // {
      //   path: ':boardTagId',
      //   component: NewsComponent,
      // },
      {
        path: ':id',
        component: NewsDetailV2Component,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
