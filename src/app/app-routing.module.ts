import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthRequired } from './auth/auth.gaurd';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'add',
    loadChildren: () => import('./anxiety-form/anxiety-form.module').then(m => m.AnxietyFormModule),
    canActivate: [AuthRequired]
  },
  {
    path: 'events',
    loadChildren: () => import('./anxiety-table/anxiety-table.module').then(m => m.AnxietyTableModule),
    canActivate: [AuthRequired]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthRequired]
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
