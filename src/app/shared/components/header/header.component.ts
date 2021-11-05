import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogin = false;
  username = '';
  isOpenMenuMobile = false;

  constructor(
    public languageService: LanguageService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    const username = this.tokenStorageService.username;
    if (username) {
      this.isLogin = true;
      this.username = username;
    }
  }

  changeLanguage(mLanguage: string): void {
    this.languageService.currentLanguage = mLanguage;
  }

  logout(): void {
    this.tokenStorageService.clearTokenStorage();
    window.location.reload();
  }
}
