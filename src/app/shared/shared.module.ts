import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { PageLoadingComponent } from './components/page-loading/page-loading.component';
import { ImageOverlayFullscreenComponent } from './components/image-overlay-fullscreen/image-overlay-fullscreen.component';
import { AuthenticationInterceptor } from './interceptors/authentication.intercepter';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { AuthGuard } from './guards/auth.guard';
import { TrimPipe } from './pipes/trim.pipe';
import { ReferencesPipe } from './pipes/references.pipe';
import { MaterialModule } from '@material/material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ToAgePipe } from './pipes/to-age.pipe';
import { HighlightSearchPipe } from './pipes/highlight-search.pipe';
import { GenderToStringPipe } from './pipes/gender-to-string.pipe';
import { CountryAutocompleteComponent } from './components/country-autocomplete/country-autocomplete.component';
import { RatingInputComponent } from './components/rating-input/rating-input.component';

const COMPONENTS = [
  FooterComponent,
  HeaderComponent,
  AuthLayoutComponent,
  HomeLayoutComponent,
  PageLoadingComponent,
  ImageOverlayFullscreenComponent,
  SnackbarComponent,
  CountryAutocompleteComponent,
  RatingInputComponent,
];

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true,
  },
];

@NgModule({
  //
  declarations: [
    ...COMPONENTS,
    TrimPipe,
    ReferencesPipe,
    ConfirmDialogComponent,
    ToAgePipe,
    HighlightSearchPipe,
    GenderToStringPipe,
    CountryAutocompleteComponent,
  ],
  providers: [httpInterceptorProviders, AuthGuard],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  exports: [
    ...COMPONENTS,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TrimPipe,
    ReferencesPipe,
    ToAgePipe,
    HighlightSearchPipe,
    GenderToStringPipe,
  ],
})
export class SharedModule {}
