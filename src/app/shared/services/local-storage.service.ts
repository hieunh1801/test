import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService extends StorageService {
  constructor(@Inject(DOCUMENT) private document: Document) {
    super(document?.defaultView?.localStorage);
  }
}
