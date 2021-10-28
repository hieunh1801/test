import { Inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private storageService: StorageService = null;

  constructor(
    @Inject(LocalStorageService) private localStorageService,
    @Inject(SessionStorageService) private sessionStorageService
  ) {
    const rememberMe = this.localStorageService.get(TokenKey.REMEMBER_ME);
    if (rememberMe) {
      this.storageService = this.localStorageService;
    } else {
      this.storageService = this.sessionStorageService;
    }
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
      this.storageService = this.sessionStorageService;
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
}

enum TokenKey {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
  USERNAME = 'username',
  AUTHORITIES = 'authorities',
  REMEMBER_ME = 'rememberMe',
}
