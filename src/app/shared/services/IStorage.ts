import { BehaviorSubject } from 'rxjs';

export interface IStorage {
  /**
   * watch data of given key
   * @param key: key
   */
  watch<T>(key: string): BehaviorSubject<T>;

  /**
   * get data of given key
   * @param key: key
   */
  get<T>(key: string): T;

  /**
   * set value on given key
   * @param key: key
   * @param value: value
   */
  set<T>(key: string, value: T): void;

  /**
   * Remove key-value from storage
   * @param key: key
   */
  remove(key: string): void;

  /**
   * Remove multiple key-value
   * @param key: key
   */
  removes(keys: string[]): void;
  /**
   * Clear everything in storage
   */
  clear(): void;
}
