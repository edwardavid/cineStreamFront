import { Pipe, PipeTransform } from '@angular/core';
import { Series } from '../interfaces/series';


@Pipe({
  name: 'filterSeries',
  standalone: true
})
export class FilterSeriesPipe implements PipeTransform {

  transform(value: Series[], filtro: string): Series[] {
    return value.filter(x=> x.title.toLowerCase().includes(filtro) || x.thema.toLocaleLowerCase().includes(filtro))
  }

}




