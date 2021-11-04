import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogin = false;
  step: number;
  username = '';
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
      this.username = username;
      this.step = 1;
    }
  }

  changeLanguage(mLanguage: string): void {
    this.languageService.currentLanguage = mLanguage;
  }

  logout(): void {
    this.tokenStorageService.clearTokenStorage();
    window.location.reload();
  }

  goRegister(): void {
    this.router.navigateByUrl('/auth/register?step=1');
    // window.location.href = '/auth/register?step=' + this.step;
  }
}
