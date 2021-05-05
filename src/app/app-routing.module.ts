import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'artists',
    loadChildren: () => import('./artists/artists.module').then(m => m.ArtistsModule),
  },
  {
    path: 'genres',
    loadChildren: () => import('./genres/genres.module').then(m => m.GenresModule),
  },
  {
    path: 'records',
    loadChildren: () => import('./records/records.module').then(m => m.RecordsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
