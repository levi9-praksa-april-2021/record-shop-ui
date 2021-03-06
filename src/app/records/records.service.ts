import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Record, Records } from 'src/app/core/model/record';
import { RecordRequest } from './Record';
import { RecordsSearch } from './records-search';

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
  private recordsUrl: string = '/api/records';

  mockRecords: Record[] = [
    {
      id: 1,
      title: 'The Dark Side of The Moon',
      price: 26.55,
      stock: 30,
      artists: [
        {
          id: 1,
          firstName: 'Pink',
          lastName: 'Floyd'
        },
        {
          id: 2,
          firstName: 'Purple',
          lastName: 'Floyd'
        }
      ],
      genres: [
        {
          id: 1,
          name: 'Rock'
        }
      ]
    },
    {
      id: 2,
      title: 'Thriller',
      price: 19.98,
      stock: 50,
      artists: [
        {
          id: 2,
          firstName: 'Michael',
          lastName: 'Jackson'
        }
      ],
      genres: [
        {
          id: 2,
          name: 'Pop'
        }
      ]
    }
  ];

  constructor(private http: HttpClient) { }

  // getRecords(): Observable<Record[]> {
  //   return of(this.mockRecords.concat(this.mockRecords).concat(this.mockRecords));
  // }

  getRecords(search: RecordsSearch): Observable<Records> {
    let query: string = '';
    if (search.title)
      query += `album=ilike=${search.title};`;
    if (search.artistFirstName)
      query += `artists.firstName=ilike=${search.artistFirstName};`;
    if (search.artistLastName)
      query += `artists.lastName=ilike=${search.artistLastName};`;
    if (search.genre)
      query += `genres.name=ilike=${search.genre};`;
    if (query.length)
      query = '?filter=' + query.slice(0, query.length - 1);

    return this.http.get<Records>(`${this.recordsUrl}${query}`);
  }

  addRecord(record: RecordRequest): Observable<Record> {
    const url = `${this.recordsUrl}`;
    return this.http.post<Record>(url, record, httpOptions);
  }

  updateRecord(record: RecordRequest): Observable<Record> {
    const url = `${this.recordsUrl}/${record.id}`;
    return this.http.put<Record>(url, record, httpOptions);
  }

  // nema jos na beku
  deleteRecord(id: number): Observable<{}> {
    const url = `${this.recordsUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }

}
