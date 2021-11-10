import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root',
})
export class LogServiceService {
  constructor() {}

  log(...args: any): void {
    if (environment.logRequest) {
      console.log(...args);
    }
  }
}
