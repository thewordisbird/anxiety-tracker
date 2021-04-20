import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../material/material.module";

import { AuthComponent } from "./auth.component";
import { LogoutComponent } from "./logout/logout.component";

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
]

@NgModule({
  declarations: [
    AuthComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ]
})
export class AuthModule {}
