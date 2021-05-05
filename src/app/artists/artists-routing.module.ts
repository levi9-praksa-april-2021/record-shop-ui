import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { AddArtistComponent } from './add-artist/add-artist.component';
import { ArtistTableComponent } from './artist-table/artist-table.component';


const routes: Routes = [
  {
    path: 'add',
    component: AddArtistComponent
  },
  {
    path: '',
    component: ArtistTableComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistsRoutingModule { }
