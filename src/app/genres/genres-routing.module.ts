import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddGenreComponent } from './add-genre/add-genre.component';
import { GenreTableComponent } from './genre-table/genre-table.component';


const routes: Routes = [
  {
    path: 'add',
    component: AddGenreComponent
  },
  {
    path: 'table',
    component: GenreTableComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenresRoutingModule { }
