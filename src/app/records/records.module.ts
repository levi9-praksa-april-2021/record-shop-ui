import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsRoutingModule } from './records-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RecordCatalogComponent } from './components/record-catalog/record-catalog.component';
import { OrderInfoComponent } from './components/order-info/order-info.component';



@NgModule({
  declarations: [RecordCatalogComponent, OrderInfoComponent],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    SharedModule
  ]
})
export class RecordsModule { }
