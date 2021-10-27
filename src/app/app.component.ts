import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './shared/services/language.service';
import { MaintainService } from './shared/services/maintain.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SPMED';

  constructor(
    private languageService: LanguageService,
    private maintainService: MaintainService
  ) {
    this.languageService.init();
    this.maintainService.ping();
    this.maintainService.signUp();
  }

  ngOnInit(): void {
    document.title = this.title;
  }
}
