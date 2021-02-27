import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AnxietyFormComponent } from './anxiety-form/anxiety-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AnxietyTableComponent } from './anxiety-table/anxiety-table.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRequired, NotAuthenticated } from './auth/auth.gaurd';
import { SvgIconComponent } from './svg-icon/svg-icon.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {
    path: 'auth', component: AuthComponent,
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
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full'
  }

]


@NgModule({
  declarations: [
    AppComponent,
    AnxietyFormComponent,
    AnxietyTableComponent,
    HeaderComponent,
    AuthComponent,
    SvgIconComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
