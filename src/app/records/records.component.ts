import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  records: Array<Object>;
  private recordsUrl = 'api/records/';

  constructor(private _service:AppService) {}
  ngOnInit(): void {
    this.getRecords();
  }

  getRecords() {
    this._service.getResource(this.recordsUrl)
      .subscribe(
         data => this.records = data,
         error => console.log(error));
    }

}
