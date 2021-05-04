import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';

import { MenubarModule } from 'primeng/menubar';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    MenubarModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
