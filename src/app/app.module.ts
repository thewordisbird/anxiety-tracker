import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module'

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AnxietyFormComponent } from './anxiety-form/anxiety-form.component';
import { FormSentimentFieldComponent } from './anxiety-form/form-sentiment-field/form-sentiment-field.component';
import { FormChipFieldComponent } from './anxiety-form/form-chip-field/form-chip-field.component';
import { AddNewItemComponent } from './anxiety-form/form-chip-field/add-new-item/add-new-item.component';
import { AnxietyTableComponent } from './anxiety-table/anxiety-table.component';
import { TableChipDisplayComponent } from './anxiety-table/table-chip-display/table-chip-display.component';
import { TableParagraphDisplayComponent } from './anxiety-table/table-paragraph-display/table-paragraph-display.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    AnxietyFormComponent,
    AnxietyTableComponent,
    AuthComponent,
    FormChipFieldComponent,
    AddNewItemComponent,
    FormSentimentFieldComponent,
    TableChipDisplayComponent,
    TableParagraphDisplayComponent,
    ToolbarComponent,
    LogoutComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
