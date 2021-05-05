import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordCatalogComponent } from './components/record-catalog/record-catalog.component';

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
  {
    path: 'catalog',
    component: RecordCatalogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordsRoutingModule { }
