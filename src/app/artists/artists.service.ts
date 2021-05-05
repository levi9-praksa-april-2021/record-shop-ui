import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Artist, ArtistsPage } from './Artists';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    observe: 'response'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  constructor(private http: HttpClient) {}
  artistsUrl = `${environment.apiUrl}/api/artists`;
  private RegenerateData = new Subject<void>();
  RegenerateData$ = this.RegenerateData.asObservable();

  getArtists(): Observable<ArtistsPage> {
    const url = `${this.artistsUrl}`;
    return this.http.get<ArtistsPage>(url, httpOptions);
  }

  addArtist(artist: Artist): Observable<void> {
    const url = `${this.artistsUrl}`;
    return this.http.post<void>(url, artist, httpOptions);
  }

  updateArtist(artist: Artist): Observable<Artist> {
    const url = `${this.artistsUrl}/${artist.id}`;
    return this.http.put<Artist>(url, artist, httpOptions);
  }

  // nema jos na beku 
  deleteArtist(id: number): Observable<{}> {
    const url = `${this.artistsUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }

}
