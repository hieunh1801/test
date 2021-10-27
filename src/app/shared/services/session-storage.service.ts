import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService extends StorageService {
  constructor(@Inject(DOCUMENT) document: Document) {
    super(document?.defaultView?.sessionStorage);
  }
}
