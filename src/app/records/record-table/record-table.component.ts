import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Artist } from 'src/app/artists/Artists';
import { Genre } from 'src/app/genres/Genre';
import { AddRecordComponent } from '../add-record/add-record.component';
import { Record, RecordsPage } from '../Record';
import { RecordsService } from '../records.service';
import { UpdateRecordComponent } from '../update-record/update-record.component';

@Component({
  selector: 'app-record-table',
  templateUrl: './record-table.component.html',
  providers: [DialogService]
})
export class RecordTableComponent implements OnInit {

  recordsPage: RecordsPage;

  public ref: DynamicDialogRef;

  constructor(
    private recordsService: RecordsService,
    public dialogService: DialogService,
    public messageService: MessageService,
    public confirmationService: ConfirmationService
  ) {}

  showAddForm(): void {
    this.ref = this.dialogService.open(AddRecordComponent, {
      header: 'Add record',
      width: '30%',
      dismissableMask: true
    });

    this.ref.onClose.subscribe((submitted) => {
      if (submitted) {
        this.getRecords();
        this.messageService.add({
          severity: 'success', summary: 'Record adding successful', detail: 'You have successfully added record!' });
      }
    });
  }

  showUpdateForm(record: any): void {
    console.log(record)
    this.ref = this.dialogService.open(UpdateRecordComponent, {
      data: {
        record: record
      },
      header: 'Update record',
      width: '30%',
      dismissableMask: true
    });

    this.ref.onClose.subscribe((submitted) => {
      if (submitted) {
        this.getRecords();
        this.messageService.add({ severity: 'success', summary: 'Record updating successful', detail: 'You have successfully updated record!' });
      }
    });
  }

  showDeleteForm(id: number): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.recordsService.deleteRecord(id)
        .subscribe(
          () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have successfuly deleted record!' });
            this.getRecords();
          });
        },
      reject: () => {
      }
    });
  }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords(): void {
    // this.recordsService.getRecords().subscribe(records => this.recordsPage = records);

    const artists: Artist[] = [new Artist(1, "Artist1 firstname", "Artist1 lastname"), new Artist(2, "Artist2 firstname", "Artist2 lastname")]
    const genres: Genre[] = [new Genre(1, "genre1"), new Genre(2, "genre2")]

    const records: Record[] = [new Record(1, "Record1 title", "Record1 album", 120, 12, artists, genres), new Record(2, "Record2 title", "Record2 album", 120, 12, artists, genres)]
    const result: RecordsPage = new RecordsPage(records);
    this.recordsPage = result;
  }

}
