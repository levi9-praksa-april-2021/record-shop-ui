import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistsRoutingModule } from './artists-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ArtistsRoutingModule,
    SharedModule
  ]
})
export class ArtistsModule { }
