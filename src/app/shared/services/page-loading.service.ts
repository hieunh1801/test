import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageLoadingService {
  isLoading$ = new BehaviorSubject<boolean>(false);
  constructor() {}

  public startLoading(): void {
    this.isLoading$.next(true);
  }

  public stopLoading(): void {
    this.isLoading$.next(false);
  }
}
