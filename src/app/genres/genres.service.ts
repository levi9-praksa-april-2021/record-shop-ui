import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Genre, GenresPage } from './Genre';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    observe: 'response'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(private http: HttpClient) {}
  genresUrl = `api/genres`;
  private RegenerateData = new Subject<void>();
  RegenerateData$ = this.RegenerateData.asObservable();

  getGenres(): Observable<Genre[]> {
    const url = `${this.genresUrl}`;
    return this.http.get<Genre[]>(url, httpOptions);
  }

  addGenre(genre: Genre): Observable<void> {
    const url = `${this.genresUrl}`;
    return this.http.post<void>(url, genre, httpOptions);
  }

  updateGenre(genre: Genre): Observable<Genre> {
    const url = `${this.genresUrl}/${genre.id}`;
    return this.http.put<Genre>(url, genre, httpOptions);
  }

  // nema jos na beku
  deleteGenre(id: number): Observable<{}> {
    const url = `${this.genresUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }

}
