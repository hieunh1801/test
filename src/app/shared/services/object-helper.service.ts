import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ObjectHelperService {
  constructor() {}

  public includeValue(obj: any, value: any): boolean {
    if (obj !== null && obj !== undefined) {
      return Object.values(obj).includes(value);
    }
    return false;
  }

  public includeKey(obj: any, key: string): boolean {
    if (obj !== null && obj !== undefined) {
      return Object.keys(obj).includes(key);
    }
    return false;
  }
}
