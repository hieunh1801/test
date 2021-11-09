import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@material/material.module';

@NgModule({
  declarations: [NewsComponent],
  imports: [CommonModule, NewsRoutingModule, MaterialModule, FlexLayoutModule],
})
export class NewsModule {}
