import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistsRoutingModule } from './artists-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddArtistComponent } from './add-artist/add-artist.component';
import { ArtistTableComponent } from './artist-table/artist-table.component';
import { UpdateArtistComponent } from './update-artist/update-artist.component';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddArtistComponent,
    ArtistTableComponent,
    UpdateArtistComponent
  ],
  imports: [
    CommonModule,
    ArtistsRoutingModule,
    SharedModule,
    FlexLayoutModule,
    CoreModule,
    ReactiveFormsModule
  ]
})
export class ArtistsModule { }
