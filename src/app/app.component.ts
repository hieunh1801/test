import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './shared/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SPMED';

  constructor(private languageService: LanguageService) {
    this.languageService.init();
  }

  ngOnInit(): void {
    document.title = this.title;
  }
}
