import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { HomeLayoutComponent } from './shared/layouts/home-layout/home-layout.component';
import { PreloadAllModules } from '@angular/router';
import { environment } from '@environment/environment';

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
    path: 'user',
    component: HomeLayoutComponent,
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'genotyping-kit',
    component: HomeLayoutComponent,
    loadChildren: () =>
      import('./genotyping-kit/genotyping-kit.module').then(
        (m) => m.GenotypingKitModule
      ),
  },
  {
    path: 'human-recombinant-enzymes',
    component: HomeLayoutComponent,
    loadChildren: () =>
      import('./recombinant-enzyme/recombinant-enzyme.module').then(
        (m) => m.RecombinantEnzymeModule
      ),
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
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      // config: preloading module
      // preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
