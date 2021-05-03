import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddArtistComponent } from '../artists/add-artist/add-artist.component';

const routes: Routes = [
  {
    path: '',
    component: AddArtistComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordsRoutingModule { }
