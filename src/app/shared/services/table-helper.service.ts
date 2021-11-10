import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableHelperService {
  constructor() {}

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    let result = 0;

    a = a === null || a === undefined ? '' : a;
    b = b === null || b === undefined ? '' : b;
    if (a < b) {
      result = -1;
    } else if (a > b) {
      result = 1;
    }

    return result * (isAsc ? 1 : -1);
  }
}
