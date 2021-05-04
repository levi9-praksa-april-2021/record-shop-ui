import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddArtistComponent } from '../artists/add-artist/add-artist.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { RecordTableComponent } from './record-table/record-table.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddRecordComponent
  },
  {
    path: 'table',
    component: RecordTableComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordsRoutingModule { }
