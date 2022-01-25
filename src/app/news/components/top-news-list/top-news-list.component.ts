import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@shared/services/language.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CustomerBoard } from '../../services/news.service';

@Component({
  selector: 'app-top-news-list',
  templateUrl: './top-news-list.component.html',
  styleUrls: ['./top-news-list.component.scss'],
})
export class TopNewsListComponent implements OnInit, OnDestroy {
  @Input() newsList$ = new BehaviorSubject<CustomerBoard[]>(null);

  newsListMaxCount = 4; // max: 4 news will render
  newsList: CustomerBoard[] = null;
  defaultNewsImage = '/assets/images/default-news-thumbnail.jpg';

  subscriptions = new Subscription();
  constructor(
    private languageService: LanguageService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.subscribeLanguageChange();
    this.subscribeNewsList$();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  subscribeNewsList$() {
    const subscription = this.newsList$.subscribe(() => {
      this.reloadNewsList();
    });
    this.subscriptions.add(subscription);
  }

  subscribeLanguageChange(): void {
    const subscription = this.translateService.onLangChange.subscribe(() => {
      this.reloadNewsList();
    });
    this.subscriptions.add(subscription);
  }

  reloadNewsList() {
    let newsList = this.newsList$.getValue() || [];
    // sort
    newsList = newsList.sort((a, b) => {
      const aReadCount = a.readCount || 0;
      const bReadCount = b.readCount || 0;
      return bReadCount - aReadCount;
    });

    // get first 4 news
    newsList = newsList.splice(0, this.newsListMaxCount);

    // select language
    newsList = newsList.map((news) => {
      if (this.languageService.currentLanguage === 'kr') {
        return { ...news, ...news.kr };
      }
      return news;
    });

    console.log(newsList);
    this.newsList = newsList;
  }
}
