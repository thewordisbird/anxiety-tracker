import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';

import { AnxietyFormComponent } from './anxiety-form.component';
import { AddNewItemComponent } from './form-chip-field/add-new-item/add-new-item.component';
import { FormChipFieldComponent } from './form-chip-field/form-chip-field.component';
import { FormSentimentFieldComponent } from './form-sentiment-field/form-sentiment-field.component';

const routes: Routes = [
  {
    path: '',
    component: AnxietyFormComponent
  }
]

@NgModule({
  declarations: [
    AnxietyFormComponent,
    FormSentimentFieldComponent,
    FormChipFieldComponent,
    AddNewItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ]
})
export class AnxietyFormModule {}
