import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';

@NgModule({
  declarations: [NewsComponent, NewsDetailComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
  ],
})
export class NewsModule {}
