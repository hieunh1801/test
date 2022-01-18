import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map, finalize, filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { PageLoadingService } from '@shared/services/page-loading.service';
import {
  LanguageService,
  LanguagesProvidedType,
} from '@shared/services/language.service';
import {
  NewsService,
  CustomerBoardSearchRequest,
  CustomerBoard,
  CustomerBoardKr,
  CustomerBoardView,
} from './services/news.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, OnDestroy {
  customerBoardList$ = new BehaviorSubject<CustomerBoard[]>([]);

  searchForm = this.formBuilder.group({
    keyword: [null],
  });

  totalCustomerBoard = 0;
  boardTagId = 0;
  customerBoardDataSource: CustomerBoard[] = null;
  customerBoardData: CustomerBoard[] = null;

  subscription$ = new Subscription();
  searchKeyword: string | null;

  constructor(
    private pageLoadingService: PageLoadingService,
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private matSnackbarService: MatSnackbarService,
    public languageService: LanguageService
  ) {}

  subscribeCustomerBoardListChange(): void {
    const sub = this.customerBoardList$.subscribe((board) => {
      this.reloadTable();
    });
    this.subscription$.add(sub);
  }

  subscribeLanguageChange(): void {
    const sub = this.translateService.onLangChange.subscribe(() => {
      this.reloadTable();
    });
    this.subscription$.add(sub);
  }

  reloadTable(): void {
    const language: string = this.languageService.currentLanguage;
    let customerBoard: CustomerBoard[] = this.customerBoardList$.value || [];

    // multiple language
    if (language === LanguagesProvidedType.korea) {
      customerBoard = customerBoard.map((board) => ({
        ...board,
        ...board?.kr,
      }));
    } else if (language === LanguagesProvidedType.english) {
      customerBoard = customerBoard.map((board) => ({ ...board, ...board }));
    }
    customerBoard = customerBoard.filter((el) => el.title !== null);
    this.customerBoardDataSource = customerBoard;
  }

  ngOnInit(): void {
    this.subscribeCustomerBoardListChange();
    this.subscribeLanguageChange();

    const boardTagId = this.activatedRoute.snapshot.params?.boardTagId || null;
    this.boardTagId = boardTagId;
    if (!!boardTagId) {
      this.loadCustomerBoardListbyBoardTagId(boardTagId);
    } else {
      this.loadCustomerBoardList();
    }

    // reload
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  loadCustomerBoardList(): void {
    const formValue = this.searchForm.value;
    const searchRequest: CustomerBoardSearchRequest = {
      keyword: formValue?.keyword,
      boardCategoryId: 1,
    };
    this.pageLoadingService.startLoading();

    this.newsService
      .getCustomerBoard(searchRequest)
      .pipe(
        finalize(() => {
          this.pageLoadingService.stopLoading();
        })
      )
      .subscribe({
        next: (response: SpmedResponse<CustomerBoard>) => {
          const customerBoard: CustomerBoard = response?.data?.items[0];
          if (customerBoard == null) {
            const message = this.translateService.instant(
              'NEWS__LIST__RESULT__NOT__FOUND'
            );
            const action = this.translateService.instant(
              'MAT_SNACKBAR__ACTION__BROWSER'
            );
            this.matSnackbarService.open(message, action);
          } else {
            const customerBoardData = response?.data?.items || [];
            this.customerBoardList$.next(customerBoardData);
            // this.customerBoardDataSource = response?.data?.items || [];
            // this.getBoard(response?.data?.items);
          }
        },
        complete: () => {
          // console.log('this.newsService.search done!!!');
        },
        error: (error) => {
          console.error(error.response);
          const message2 = this.translateService.instant(
            'PDSS__BROWSER__SERVER__NOT__RESPONSE'
          );
          const action2 = this.translateService.instant(
            'MAT_SNACKBAR__ACTION__BROWSER'
          );
          this.matSnackbarService.open(message2, action2);
        },
      });
  }

  loadCustomerBoardListbyBoardTagId(boardTagId): void {
    this.pageLoadingService.startLoading();

    this.newsService
      .getCustomerBoardByboardTagId(boardTagId)
      .pipe(
        finalize(() => {
          this.pageLoadingService.stopLoading();
        })
      )
      .subscribe({
        next: (response: SpmedResponse<CustomerBoard>) => {
          const customerBoard: CustomerBoard = response?.data?.items[0];
          if (customerBoard == null) {
            const message = this.translateService.instant(
              'NEWS__LIST__RESULT__NOT__FOUND'
            );
            const action = this.translateService.instant(
              'MAT_SNACKBAR__ACTION__BROWSER'
            );
            this.matSnackbarService.open(message, action);
          } else {
            const customerBoardData = response?.data?.items || [];
            this.customerBoardList$.next(customerBoardData);
            //this.getBoard(response?.data?.items);
          }
        },
        complete: () => {
          // console.log('this.newsService.search done!!!');
        },
        error: (error) => {
          console.error(error.response);
          const message2 = this.translateService.instant(
            'PDSS__BROWSER__SERVER__NOT__RESPONSE'
          );
          const action2 = this.translateService.instant(
            'MAT_SNACKBAR__ACTION__BROWSER'
          );
          this.matSnackbarService.open(message2, action2);
        },
      });
  }
}
