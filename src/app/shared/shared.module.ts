import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { TranslateModule } from '@ngx-translate/core';

const COMPONENTS = [
  FooterComponent,
  HeaderComponent,
  AuthLayoutComponent,
  HomeLayoutComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    TranslateModule,
  ],
  exports: [...COMPONENTS, MaterialModule, FlexLayoutModule, TranslateModule],
})
export class SharedModule {}
