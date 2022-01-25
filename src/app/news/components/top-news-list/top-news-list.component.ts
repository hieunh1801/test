import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@shared/services/language.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CustomerBoard, NewsService } from '../../services/news.service';

@Component({
  selector: 'app-top-news-list',
  templateUrl: './top-news-list.component.html',
  styleUrls: ['./top-news-list.component.scss'],
})
export class TopNewsListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() newsList$ = new BehaviorSubject<CustomerBoard[]>(null);
  @Input() ignoreNewsIdList: number[] = [];

  newsListLoading = false;

  newsListMaxCount = 4; // max: 4 news will render
  newsList: CustomerBoard[] = null;
  defaultNewsImage = '/assets/images/default-news-thumbnail.jpg';

  subscriptions = new Subscription();

  constructor(
    private newsService: NewsService,
    private languageService: LanguageService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.subscribeLanguageChange();
    this.subscribeNewsList$();
    this.loadNewsList$();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ignoreNewsIdList) {
      this.reloadNewsList();
    }
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

  loadNewsList$(): void {
    if (this.newsList$.value?.length > 0) {
      return;
    }
    this.newsListLoading = true;
    this.newsService
      .getAll()
      .pipe(
        finalize(() => {
          this.newsListLoading = false;
        })
      )
      .subscribe((response) => {
        const newsList = response?.data?.items || [];
        this.newsList$.next(newsList);
      });
  }

  reloadNewsList() {
    let newsList = this.newsList$.getValue() || [];
    // select language
    newsList = newsList.map((news) => {
      if (this.languageService.currentLanguage === 'kr') {
        return { ...news, ...news.kr };
      }
      return news;
    });

    // filter news that have title
    newsList = newsList.filter((news) => news?.title?.length > 0);

    // filter news not in list ignore
    newsList = newsList.filter((news) => {
      return !this.ignoreNewsIdList.includes(news.id);
    });

    // sort
    newsList = newsList.sort((a, b) => {
      const aReadCount = a.readCount || 0;
      const bReadCount = b.readCount || 0;
      return bReadCount - aReadCount;
    });

    // get first 4 news
    newsList = newsList.splice(0, this.newsListMaxCount);

    this.newsList = newsList;
  }
}
