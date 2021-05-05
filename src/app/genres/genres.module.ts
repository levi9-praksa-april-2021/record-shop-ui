import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenresRoutingModule } from './genres-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GenreTableComponent } from './genre-table/genre-table.component';
import { AddGenreComponent } from './add-genre/add-genre.component';
import { UpdateGenreComponent } from './update-genre/update-genre.component';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    GenreTableComponent,
    AddGenreComponent,
    UpdateGenreComponent
  ],
  imports: [
    CommonModule,
    GenresRoutingModule,
    SharedModule,
    FlexLayoutModule,
    CoreModule,
    ReactiveFormsModule
  ]
})
export class GenresModule { }
