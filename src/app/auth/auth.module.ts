import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../material/material.module";

import { AuthComponent } from "./auth.component";
import { LogoutComponent } from "./logout/logout.component";
import { AuthRequired, NotAuthenticated } from "./auth.gaurd";

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [NotAuthenticated]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthRequired]
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
