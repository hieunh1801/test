import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '@shared/services/language.service';
import { PwaService } from '@shared/services/pwa.service';
import { TokenStorageService } from '@shared/services/token-storage.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogin = false;
  username = new BehaviorSubject<string>(null);
  isOpenMenuMobile = false;

  subscription$ = new Subscription();

  constructor(
    public languageService: LanguageService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,
    public pwaService: PwaService
  ) {}

  ngOnInit(): void {
    const username = this.tokenStorageService.username;
    if (username) {
      this.isLogin = true;
      this.username = this.tokenStorageService.usernameBehaviorSubject;
    }

    // this.subscribePwaServiceReadyInstallChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  subscribePwaServiceReadyInstallChange(): void {
    const sub = this.pwaService.readyInstall$.subscribe((value) => {
      console.log(value);
    });
    this.subscription$.add(sub);
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
