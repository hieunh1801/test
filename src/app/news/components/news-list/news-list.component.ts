import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@shared/services/language.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs/operators';
import { CustomerBoard, NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit, OnDestroy {
  newsList: CustomerBoard[];
  newsList$ = new BehaviorSubject<CustomerBoard[]>(null);
  newsListLoading: boolean = false;

  searchForm = this.formBuilder.group({
    keyword: [''],
  });

  defaultNewsImage = '/assets/images/default-news-thumbnail.jpg';

  subscription$ = new Subscription();

  constructor(
    private newsService: NewsService,
    private languageService: LanguageService,
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.subscribeLanguageChange();
    this.subscribeNewsList$();
    this.subscribeActivatedRouterChange();
    // this.subscribeSearchFormChange();

    this.loadNewsList$();

    console.log('re-render component');
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  subscribeActivatedRouterChange() {
    const sub = this.activatedRoute.queryParams.subscribe((params) => {
      const keyword = params.keyword;
      if (keyword) {
        this.searchForm.patchValue({
          keyword: keyword,
        });
      }
      this.reloadNewsList();
    });

    this.subscription$.add(sub);
  }

  subscribeSearchFormChange(): void {
    const sub = this.searchForm.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(250))
      .subscribe((value) => {
        this.syncQueryParam();
      });
    this.subscription$.add(sub);
  }

  subscribeNewsList$(): void {
    const sub = this.newsList$.subscribe(() => {
      this.reloadNewsList();
    });
    this.subscription$.add(sub);
  }

  subscribeLanguageChange(): void {
    const sub = this.translateService.onLangChange.subscribe(() => {
      this.reloadNewsList();
    });
    this.subscription$.add(sub);
  }

  syncQueryParam(): void {
    const keyword = this.searchForm.value.keyword;

    const queryParams: Params = {
      keyword: keyword,
    };

    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
    });

    // const url = this.router
    //   .createUrlTree([], {
    //     relativeTo: this.activatedRoute,
    //     queryParams: queryParams,
    //   })
    //   .toString();
    // this.location.replaceState(url);
  }

  onClickSearch(): void {
    this.syncQueryParam();
  }

  loadNewsList$(): void {
    this.newsListLoading = true;
    this.newsService
      .getAll()
      .pipe(
        finalize(() => {
          this.newsListLoading = false;
        })
      )
      .subscribe((response) => {
        const newsList = response?.data?.items || null;
        this.newsList$.next(newsList);
      });
  }

  reloadNewsList(): void {
    const lang: string = this.languageService.currentLanguage;
    const queryParams = this.activatedRoute.snapshot.queryParams;
    const keyword = queryParams?.keyword || '';

    let newsList: CustomerBoard[] = this.newsList$.value || [];

    // choose language
    if (lang == 'kr') {
      newsList = newsList?.map((news) => ({ ...news, ...news?.kr }));
    }
    // filter news not have title
    newsList = newsList?.filter((news) => news?.title);

    // filter by keyword
    newsList = newsList.filter((news) => {
      const title = news.title?.toLowerCase() || '';
      const normalizedKeyword = keyword?.toLowerCase() || '';

      const regex = /(<([^>]+)>)/gi;
      const content = news?.content?.replace(regex, '')?.toLowerCase() || '';
      return (
        title.includes(normalizedKeyword) || content.includes(normalizedKeyword)
      );
    });

    this.newsList = newsList;
  }
}
