import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsSearchAndRecentComponent } from './components/news-search-and-recent/news-search-and-recent.component';
import { AnimationModule } from '@animation/animation.module';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { TopNewsListComponent } from './components/top-news-list/top-news-list.component';

@NgModule({
  declarations: [
    NewsComponent,
    NewsDetailComponent,
    NewsListComponent,
    NewsSearchAndRecentComponent,
    TagListComponent,
    TopNewsListComponent,
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    AnimationModule,
  ],
})
export class NewsModule {}
