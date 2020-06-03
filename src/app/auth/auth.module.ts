import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordResetEmailComponent } from './password-reset-email/password-reset-email.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import {AngularMaterialModule} from "../angular-material/angular-material.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [PasswordResetEmailComponent, PasswordResetComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule
  ]
})
export class AuthModule { }
