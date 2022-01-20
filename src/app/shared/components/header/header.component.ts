import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
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

  headerInfo = {
    serviceList: [
      {
        title: marker('LAYOUT__HEADER__SERVICES__PDSS'),
        subTitle: marker('LAYOUT__HEADER__SERVICES__PDSS__SUB_TITLE'),
        routerLink: '/pdss',
        icon: 'trip_origin',
      },
      {
        title: marker('LAYOUT__HEADER__SERVICES__GENOTYPING_KIT'),
        subTitle: marker('LAYOUT__HEADER__SERVICES__GENOTYPING_KIT__SUB_TITLE'),
        routerLink: '/genotyping-kit',
        icon: 'medical_services',
      },
      {
        title: marker('LAYOUT__HEADER__SERVICES__ADME'),
        subTitle: marker('LAYOUT__HEADER__SERVICES__ADME__SUB_TITLE'),
        routerLink: '/adme',
        icon: 'my_location',
      },
      {
        title: marker('LAYOUT__HEADER__SERVICES__HUMAN_RECOMBINANT_ENZYMES'),
        subTitle: marker(
          'LAYOUT__HEADER__SERVICES__HUMAN_RECOMBINANT_ENZYMES__SUB_TITLE'
        ),
        routerLink: '/human-recombinant-enzymes',
        icon: 'accessibility_new',
      },
    ],
  };

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
