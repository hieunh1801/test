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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { PageLoadingComponent } from './components/page-loading/page-loading.component';
import { ImageOverlayFullscreenComponent } from './components/image-overlay-fullscreen/image-overlay-fullscreen.component';
import { AuthenticationInterceptor } from './interceptors/authentication.intercepter';

const COMPONENTS = [
  FooterComponent,
  HeaderComponent,
  AuthLayoutComponent,
  HomeLayoutComponent,
  PageLoadingComponent,
  ImageOverlayFullscreenComponent,
];

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true,
  },
];

@NgModule({
  declarations: [...COMPONENTS],
  providers: [httpInterceptorProviders],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    TranslateModule,
  ],
  exports: [
    ...COMPONENTS,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
})
export class SharedModule {}
