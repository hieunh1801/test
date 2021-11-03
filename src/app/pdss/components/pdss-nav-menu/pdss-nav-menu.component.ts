import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-pdss-nav-menu',
  templateUrl: './pdss-nav-menu.component.html',
  styleUrls: ['./pdss-nav-menu.component.scss'],
})
export class PdssNavMenuComponent implements OnInit {
  isLogin = false;
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
