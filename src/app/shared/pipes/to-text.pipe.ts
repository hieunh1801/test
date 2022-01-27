import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toText',
})
export class ToTextPipe implements PipeTransform {
  // transform html to text
  transform(value: string | any): string {
    var regex = /(<([^>]+)>)/gi;
    return value?.replace(regex, '');
  }
}
