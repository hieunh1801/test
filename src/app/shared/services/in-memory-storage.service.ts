import { JsonpClientBackend } from '@angular/common/http';
import { HostListener, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IStorage } from './IStorage';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class InMemoryStorageService implements IStorage, OnDestroy {
  private storage = {};
  private subjects: Map<string, BehaviorSubject<any>>;

  private subscription$ = new Subscription();

  constructor(private localStorageService: LocalStorageService) {
    window.addEventListener('storage', ($event: StorageEvent) => {
      // console.log('InMemoryStorageService', $event);
      const key = $event.key;

      let value = null;
      try {
        value = JSON.parse($event.newValue);
      } catch (e) {
        value = $event.newValue;
      }

      if (key === RestoreMemoryKey.RESTORE_SESSION_STORAGE) {
        localStorage.setItem(
          RestoreMemoryKey.SESSION_STORAGE,
          JSON.stringify(this.storage)
        );
        localStorage.removeItem(RestoreMemoryKey.SESSION_STORAGE);
      }

      if (key === RestoreMemoryKey.SESSION_STORAGE && this.isStorageEmpty()) {
        const mStorage = value;
        for (const k in mStorage) {
          this.set(k, mStorage[k]);
        }
      }
    });
    (window as any).memoryStorage = this.storage;
    this.subjects = new Map<string, BehaviorSubject<any>>();
    this.emitEventRestoreSessionStorage();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private isStorageEmpty(): boolean {
    for (const i in this.storage) {
      return false;
    }
    return true;
  }

  private emitEventRestoreSessionStorage(): void {
    // restoreSessionStorage#step1: check memory storage is empty
    if (this.isStorageEmpty()) {
      this.localStorageService.set(
        RestoreMemoryKey.RESTORE_SESSION_STORAGE,
        Date.now()
      );
    }
  }

  watch<T>(key: string): BehaviorSubject<T> {
    if (!this.subjects?.has(key)) {
      this.subjects?.set(key, new BehaviorSubject<T>(null));
    }

    const item: string = this.storage[key];

    this.subjects?.get(key)?.next(item);

    return this.subjects?.get(key);
  }

  get<T>(key: string): T {
    return this.storage[key] as T;
  }

  set<T>(key: string, value: T): void {
    this.storage[key] = value;
    if (!this.subjects?.has(key)) {
      this.subjects?.set(key, new BehaviorSubject<T>(value));
    } else {
      this.subjects?.get(key).next(value);
    }
    (window as any).memoryStorage = this.storage;
  }

  remove(key: string): void {
    if (this.subjects?.has(key)) {
      this.subjects?.get(key).complete();
      this.subjects?.delete(key);
    }

    delete this.storage[key];
  }

  removes(keys: string[]): void {
    for (const key of keys) {
      this.remove(key);
    }
  }

  clear(): void {
    this.subjects?.clear();
    this.storage = {};
  }
}

enum RestoreMemoryKey {
  RESTORE_SESSION_STORAGE = 'restoreSessionStorage',
  SESSION_STORAGE = 'sessionStorage',
}
