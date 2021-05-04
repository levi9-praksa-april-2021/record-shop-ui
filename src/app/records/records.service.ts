import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Record } from 'src/app/core/model/record';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

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

  constructor() { }

  getRecords(): Observable<Record[]> {
    return of(this.mockRecords.concat(this.mockRecords).concat(this.mockRecords));
  }
}
