import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { TokenStorageService } from '@shared/services/token-storage.service';

@Component({
  selector: 'app-pdss-nav-menu',
  templateUrl: './pdss-nav-menu.component.html',
  styleUrls: ['./pdss-nav-menu.component.scss'],
  animations: [
    trigger('pdssNavMenuMobile', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0ms cubic-bezier(0.2, 0.0, 0.1, 1)', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms cubic-bezier(0.2, 0.0, 0.1, 1)', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class PdssNavMenuComponent implements OnInit {
  isLogin = false;
  isOpenMenuMobile = false;

  productRouteList = [
    {
      title: marker("PDSS__NAV_MENU__PGX_NP"),
      routerLink: ['products', 'pgx-np']
    },
    {
      title: marker("PDSS__NAV_MENU__PGX_PREMIUM"),
      routerLink: ['products', 'pgx-premium']
    },
    {
      title: marker("PDSS__NAV_MENU__SINGLE_GENE"),
      routerLink: ['products', 'single-gene']
    }
  ]

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    if (
      this.tokenStorageService.accessToken &&
      this.tokenStorageService.username
    ) {
      this.isLogin = true;
    }
  }
}
