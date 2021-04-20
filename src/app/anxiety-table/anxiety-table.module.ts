import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../material/material.module";

import { AnxietyTableComponent } from "./anxiety-table.component";
import { TableChipDisplayComponent } from "./table-chip-display/table-chip-display.component";
import { TableParagraphDisplayComponent } from "./table-paragraph-display/table-paragraph-display.component";

const routes: Routes = [
  {
    path: '',
    component: AnxietyTableComponent
  }
]

@NgModule({
  declarations: [
    AnxietyTableComponent,
    TableChipDisplayComponent,
    TableParagraphDisplayComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ]
})
export class AnxietyTableModule {}
