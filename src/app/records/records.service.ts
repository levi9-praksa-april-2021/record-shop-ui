import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Record, RecordsPage } from './Record';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    observe: 'response'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(private http: HttpClient) {}
  recordsUrl = `${environment.apiUrl}/api/records`;
  private RegenerateData = new Subject<void>();
  RegenerateData$ = this.RegenerateData.asObservable();

  getRecords(): Observable<RecordsPage> {
    const url = `${this.recordsUrl}`;
    return this.http.get<RecordsPage>(url, httpOptions);
  }

  addRecord(record: Record): Observable<void> {
    const url = `${this.recordsUrl}`;
    return this.http.post<void>(url, record, httpOptions);
  }

  updateRecord(record: Record): Observable<Record> {
    const url = `${this.recordsUrl}/${record.id}`;
    return this.http.put<Record>(url, record, httpOptions);
  }

  // nema jos na beku 
  deleteRecord(id: number): Observable<{}> {
    const url = `${this.recordsUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }

}
