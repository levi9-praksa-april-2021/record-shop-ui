import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsRoutingModule } from './records-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RecordCatalogComponent } from './components/record-catalog/record-catalog.component';
import { OrderInfoComponent } from './components/order-info/order-info.component';
import { UpdateRecordComponent } from './update-record/update-record.component';
import { RecordTableComponent } from './record-table/record-table.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [RecordCatalogComponent, OrderInfoComponent,
    UpdateRecordComponent,
    RecordTableComponent,
    AddRecordComponent
  ],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    SharedModule,
    FlexLayoutModule,
    CoreModule,
    ReactiveFormsModule
  ]
})
export class RecordsModule { }
