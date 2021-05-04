import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordCatalogComponent } from './components/record-catalog/record-catalog.component';


const routes: Routes = [
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
