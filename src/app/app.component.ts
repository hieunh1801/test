import { Component, HostListener, OnInit } from '@angular/core';
import { InMemoryStorageService } from '@shared/services/in-memory-storage.service';
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
    private maintainService: MaintainService,
    private inMemoryStorageService: InMemoryStorageService
  ) {
    this.languageService.init();
    this.maintainService.ping();
  }

  ngOnInit(): void {
    document.title = this.title;
  }
}
