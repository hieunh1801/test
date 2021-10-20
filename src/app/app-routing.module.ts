import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { HomeLayoutComponent } from './shared/layouts/home-layout/home-layout.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeLayoutComponent,
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },

  {
    path: 'about-us',
    component: HomeLayoutComponent,
    loadChildren: () =>
      import('./about-us/about-us.module').then((m) => m.AboutUsModule),
  },
  {
    path: 'contact',
    component: HomeLayoutComponent,
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: 'news',
    component: HomeLayoutComponent,
    loadChildren: () => import('./news/news.module').then((m) => m.NewsModule),
  },
  {
    path: 'pdss',
    component: HomeLayoutComponent,
    loadChildren: () => import('./pdss/pdss.module').then((m) => m.PdssModule),
  },
  {
    path: 'adme',
    component: HomeLayoutComponent,
    loadChildren: () => import('./adme/adme.module').then((m) => m.AdmeModule),
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () =>
      import('./not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
