import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  // transform(items: any[], filterBy: string): any[] {
  transform(items: any[], filterBy: string): any[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    // return items.filter((item) => item.title.indexOf(filterBy) !== -1);
    return items.filter(
      (item) => item && item.title !== null && item.kr.title !== null
    );
  }
}
