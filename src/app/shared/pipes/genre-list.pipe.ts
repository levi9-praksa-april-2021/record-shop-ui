import { Pipe, PipeTransform } from '@angular/core';
import { Genre } from 'src/app/core/model/genre';

@Pipe({
  name: 'genreList'
})
export class GenreListPipe implements PipeTransform {

  transform(genres: Genre[]): string {
    return genres
      .map(genres => genres.name)
      .reduce((accumulator, currentValue) => `${accumulator}, ${currentValue}`, '').slice(2);
  }

}
