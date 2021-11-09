/**
 * This pipe is using for show reference with line number
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'references',
})
export class ReferencesPipe implements PipeTransform {
  transform(value: string | null | undefined, ...args: unknown[]): unknown {
    // transform: trim data
    value = value?.trim() || '';

    // transform: add number for each line
    if (value) {
      let i = 1;
      value = value.replace(/^/gm, () => `${i++}. `);
    }
    return value;
  }
}
