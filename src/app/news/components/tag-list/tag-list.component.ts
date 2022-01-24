import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@shared/services/language.service';
import { Subscription } from 'rxjs';
import { CustomerBoardTag } from '../../services/news.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements OnInit, OnDestroy {
  @Input() tagList: CustomerBoardTag[] = [];

  dataSource: CustomerBoardTag[] = [];

  subscriptions = new Subscription();

  constructor(
    private languageService: LanguageService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.subscribeLanguageChange();
    this.loadDataSource();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  subscribeLanguageChange(): void {
    const sub = this.translateService.onLangChange.subscribe(() => {
      this.loadDataSource();
    });
    this.subscriptions.add(sub);
  }

  loadDataSource(): void {
    const currentLanguage = this.languageService.currentLanguage;
    const dataSource =
      this.tagList?.map((tag) => {
        if (currentLanguage === 'kr') {
          return { ...tag, ...tag.kr };
        } else {
          return {
            ...tag,
          };
        }
      }) || [];

    console.log('dataSourceChange', dataSource);

    this.dataSource = dataSource;
  }
}
