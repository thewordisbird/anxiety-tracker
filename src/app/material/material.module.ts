import { NgModule } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';


const materialComponenets = [
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatInputModule,
  MatSliderModule,
  MatRadioModule,
  MatSelectModule,
  MatCardModule,
  MatIconModule,
  MatTableModule,
  MatToolbarModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatChipsModule
]

@NgModule({
  imports: [ ...materialComponenets ],
  exports: [ ...materialComponenets ]
})
export class MaterialModule { }
