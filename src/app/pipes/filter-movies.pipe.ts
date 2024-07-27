
import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../interfaces/movie';

@Pipe({
  name: 'filtermovies',
  standalone: true
})
export class FilterMoviesPipe implements PipeTransform {

  transform(value: Movie[], filtro: string): Movie[] {
    return value.filter(x=> x.title.toLowerCase().includes(filtro) || x.thema.toLocaleLowerCase().includes(filtro))
  }

}
