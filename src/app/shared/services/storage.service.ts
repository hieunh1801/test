import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Storage service
 * used for persist application data in observable key value pair
 */
export class StorageService {
  private storage: Storage;
  private subjects: Map<string, BehaviorSubject<any>>;

  /**
   * Constructor with service injection
   * @param storage: localStorage | sessionStorage
   */
  constructor(storage: Storage) {
    this.storage = storage;
    this.subjects = new Map<string, BehaviorSubject<any>>();
  }

  /**
   * watch data of given key
   * @param key: key
   */
  watch<T>(key: string): Observable<T> {
    if (!this.subjects.has(key)) {
      this.subjects.set(key, new BehaviorSubject<T>(null));
    }

    const itemStr: string = this.storage.getItem(key);

    const item: T =
      itemStr === 'undefined'
        ? undefined
        : itemStr === ''
        ? null
        : (JSON.parse(itemStr) as T);

    this.subjects.get(key).next(item);
    return this.subjects.get(key).asObservable();
  }

  /**
   * get data of given key
   * @param key: key
   */
  get<T>(key: string): T {
    const itemStr = this.storage.getItem(key);
    return itemStr === 'undefined'
      ? undefined
      : itemStr === ''
      ? null
      : (JSON.parse(itemStr) as T);
  }

  /**
   * set value on given key
   * @param key: key
   * @param value: value
   */
  set<T>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
    if (!this.subjects.has(key)) {
      this.subjects.set(key, new BehaviorSubject<T>(value));
    } else {
      this.subjects.get(key).next(value);
    }
  }

  /**
   * Remove key-value from storage
   * @param key: key
   */
  remove(key: string): void {
    if (this.subjects.has(key)) {
      this.subjects.get(key).complete();
      this.subjects.delete(key);
    }
    console.log('removeItem', key);
    this.storage.removeItem(key);
  }

  removes(keys: string[]): void {
    for (const key of keys) {
      this.remove(key);
    }
  }
  /**
   * Clear everything in storage
   */
  clear(): void {
    this.subjects.clear();
    this.storage.clear();
  }
}
