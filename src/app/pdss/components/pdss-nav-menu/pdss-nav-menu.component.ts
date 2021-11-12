import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '@shared/services/token-storage.service';

@Component({
  selector: 'app-pdss-nav-menu',
  templateUrl: './pdss-nav-menu.component.html',
  styleUrls: ['./pdss-nav-menu.component.scss'],
  animations: [
    trigger('pdssNavMenuMobile', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class PdssNavMenuComponent implements OnInit {
  isLogin = false;
  isOpenMenuMobile = false;
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
