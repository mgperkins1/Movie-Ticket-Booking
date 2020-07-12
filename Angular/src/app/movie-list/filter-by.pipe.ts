import { Movie } from './../movie';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {
  filtered: Movie[];

  transform(value: Movie[], args?: string): Movie[] {
    this.filtered = [];
    if (args === '2d') {
      for (let v of value) {
        if (v.format === '2D') {
          this.filtered.push(v);
        }
      }
      return this.filtered;
    } else if (args === '3d') {
      for (let v of value) {
        if (v.format === '3D') {
          this.filtered.push(v);
        }
      }
      return this.filtered;
    } else if (args === 'none') {
      return value;
    }
    return value;
  }
}
