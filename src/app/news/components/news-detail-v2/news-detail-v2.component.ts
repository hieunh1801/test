import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@shared/services/language.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CustomerBoard, NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-detail-v2',
  templateUrl: './news-detail-v2.component.html',
  styleUrls: ['./news-detail-v2.component.scss'],
})
export class NewsDetailV2Component implements OnInit, OnDestroy {
  newsDetail$ = new BehaviorSubject<CustomerBoard>(null);
  newsDetail: CustomerBoard = null;
  newsDetailLoading: boolean = false;

  subscriptions = new Subscription();
  constructor(
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.subscribeNewsDetail$();
    this.subscribeLanguageChange();

    this.subscribeRouteChange();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  subscribeRouteChange(): void {
    const sub = this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.newsDetail$.next(null);
      this.loadNewsDetail$(id);
    });
    this.subscriptions.add(sub);
  }

  subscribeNewsDetail$(): void {
    const subscription = this.newsDetail$.subscribe((newsDetail) => {
      this.reloadNewsDetail();
    });

    this.subscriptions.add(subscription);
  }

  subscribeLanguageChange(): void {
    const subscription = this.translateService.onLangChange.subscribe(() => {
      this.reloadNewsDetail();
    });
    this.subscriptions.add(subscription);
  }

  loadNewsDetail$(id: number): void {
    this.newsDetailLoading = true;
    this.newsService
      .getCustomerBoardById(id)
      .pipe(
        finalize(() => {
          this.newsDetailLoading = false;
        })
      )
      .subscribe((response) => {
        const news = response?.data?.items?.[0];
        this.newsDetail$.next(news);
      });
  }

  reloadNewsDetail(): void {
    let newsDetail = this.newsDetail$.value;
    if (newsDetail) {
      const language = this.languageService.currentLanguage;

      if (language === 'kr') {
        newsDetail = { ...newsDetail, ...newsDetail?.kr };
      }

      this.newsDetail = newsDetail;
    }
  }
}
