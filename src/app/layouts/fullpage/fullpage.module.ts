import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullpageComponent } from './fullpage.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LostPasswordComponent } from 'src/app/modules/login/lost-password/lost-password.component';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [
    FullpageComponent,
    LoginComponent,
    LostPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class FullpageModule { }
