import { Movie } from './../movie';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  sorted: Movie[];

  transform(value: Movie[], args: string): Movie[] {
    this.sorted = [];
    if (args === 'popularity') {
      value.sort((a, b) => {
        return b.rating - a.rating;
        // if (a.rating < b.rating) {
        //   return 1;
        // } else if (a.rating > b.rating) {
        //   return -1;
        // } else {
        //   return 0;
        // }
      });
      return (this.sorted = value);
    } else if (args === 'descending') {
      value.sort((a, b) => {
        if (a.name < b.name) {
          return 1;
        } else if (a.name > b.name) {
          return -1;
        } else {
          return 0;
        }
      });
      return (this.sorted = value);
    }
    return value;
  }
}
