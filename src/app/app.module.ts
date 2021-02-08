import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AnxietyFormComponent } from './anxiety-form/anxiety-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AnxietyTableComponent } from './anxiety-table/anxiety-table.component';
import { HeaderComponent } from './header/header.component';

const appRoutes: Routes = [
  {path: 'add', component: AnxietyFormComponent },
  {path: 'events', component: AnxietyTableComponent },
  {path: '', redirectTo: '/add', pathMatch: 'full' }
]


@NgModule({
  declarations: [
    AppComponent,
    AnxietyFormComponent,
    AnxietyTableComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
