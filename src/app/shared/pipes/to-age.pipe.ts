import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toAge',
})
export class ToAgePipe implements PipeTransform {
  transform(value: string | Date, ...args: unknown[]): unknown {
    try {
      const year = new Date(value).getFullYear();
      const currentYear = new Date().getFullYear();
      return currentYear - year;
    } catch (e) {
      return null;
    }
  }
}
