import { Pipe, PipeTransform } from '@angular/core';
import { Artist } from 'src/app/core/model/artist';

@Pipe({
  name: 'artistList'
})
export class ArtistListPipe implements PipeTransform {

  transform(artists: Artist[]): string {
    return artists
      .map(artist => `${artist.firstName} ${artist.lastName}`)
      .reduce((accumulator, currentValue) => `${accumulator}, ${currentValue}`, '').slice(2);
  }

}
