import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnxietyFormComponent } from './anxiety-form/anxiety-form.component';
import { AnxietyTableComponent } from './anxiety-table/anxiety-table.component';
import { AuthComponent } from './auth/auth.component';
import { AuthRequired, NotAuthenticated } from './auth/auth.gaurd';
import { LogoutComponent } from './auth/logout/logout.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [NotAuthenticated]
  },
  {
    path: 'add',
    component: AnxietyFormComponent,
    canActivate: [AuthRequired]
  },
  {
    path: 'events',
    component: AnxietyTableComponent,
    canActivate: [AuthRequired]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthRequired]
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
