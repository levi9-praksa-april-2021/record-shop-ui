import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsRoutingModule } from './records-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RecordCatalogComponent } from './components/record-catalog/record-catalog.component';



@NgModule({
  declarations: [RecordCatalogComponent],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    SharedModule
  ]
})
export class RecordsModule { }
