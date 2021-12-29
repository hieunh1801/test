import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '@shared/services/language.service';
import { TokenStorageService } from '@shared/services/token-storage.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogin = false;
  username = new BehaviorSubject<string>(null);
  isOpenMenuMobile = false;

  constructor(
    public languageService: LanguageService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const username = this.tokenStorageService.username;
    if (username) {
      this.isLogin = true;
      this.username = this.tokenStorageService.usernameBehaviorSubject;
    }
  }

  changeLanguage(mLanguage: string): void {
    this.languageService.currentLanguage = mLanguage;
  }

  logout(): void {
    this.tokenStorageService.logout();
  }

  handleOnLogin(): void {
    const href = this.router.url;
    this.router.navigateByUrl(`/auth/login?redirectFromUrl=${href}`);
  }
}
