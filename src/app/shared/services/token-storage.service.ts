import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InMemoryStorageService } from './in-memory-storage.service';
import { IStorage } from './IStorage';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private storageService: IStorage = null;

  constructor(
    private inMemoryStorage: InMemoryStorageService,
    @Inject(LocalStorageService) private localStorageService
  ) {
    const rememberMe = this.localStorageService.get(TokenKey.REMEMBER_ME);
    if (rememberMe) {
      this.storageService = this.localStorageService;
    } else {
      this.storageService = this.inMemoryStorage;
    }

    window.addEventListener('storage', ($event: StorageEvent) => {
      const key = $event.key;
      if (key === TokenKey.FORCE_RELOAD) {
        window.location.reload();
      }
    });
  }

  public set rememberMe(rememberMe: boolean) {
    if (rememberMe) {
      this.storageService.removes([TokenKey.REMEMBER_ME]);
      this.storageService = this.localStorageService;
    } else {
      this.storageService.removes([
        TokenKey.ACCESS_TOKEN,
        TokenKey.REFRESH_TOKEN,
        TokenKey.REMEMBER_ME,
      ]);
      this.storageService = this.inMemoryStorage;
    }
    this.storageService.set(TokenKey.REMEMBER_ME, rememberMe);
  }

  public get rememberMe(): boolean {
    return this.storageService.get<boolean>(TokenKey.REMEMBER_ME);
  }

  public set accessToken(accessToken: string) {
    this.storageService.set(TokenKey.ACCESS_TOKEN, accessToken);
  }

  public get accessToken(): string {
    return this.storageService.get<string>(TokenKey.ACCESS_TOKEN);
  }

  public set refreshToken(refreshToken: string) {
    this.storageService.set(TokenKey.REFRESH_TOKEN, refreshToken);
  }

  public get refreshToken(): string {
    return this.storageService.get<string>(TokenKey.REFRESH_TOKEN);
  }

  public set username(username: string) {
    this.storageService.set(TokenKey.USERNAME, username);
  }

  public get username(): string {
    return this.storageService.get<string>(TokenKey.USERNAME);
  }

  public get usernameBehaviorSubject(): BehaviorSubject<string> {
    return this.storageService.watch<string>(TokenKey.USERNAME);
  }

  public set authorities(authorities: string[]) {
    this.storageService.set(TokenKey.AUTHORITIES, authorities);
  }

  public get authorities(): string[] {
    return this.storageService.get(TokenKey.AUTHORITIES);
  }

  /**
   * Clear all key related to token
   */
  public clearTokenStorage(): void {
    this.storageService.removes([
      TokenKey.ACCESS_TOKEN,
      TokenKey.REFRESH_TOKEN,
      TokenKey.USERNAME,
      TokenKey.AUTHORITIES,
      TokenKey.REMEMBER_ME,
    ]);
  }

  private forceReload(): void {
    localStorage.setItem(TokenKey.FORCE_RELOAD, Date.now().toString());
  }

  logout(): void {
    this.clearTokenStorage();
    this.forceReload();
    window.location.reload();
  }
}

enum TokenKey {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
  USERNAME = 'username',
  AUTHORITIES = 'authorities',
  REMEMBER_ME = 'rememberMe',
  FORCE_RELOAD = 'forceReload',
}
