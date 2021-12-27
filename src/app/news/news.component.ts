import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map, finalize, filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { PageLoadingService } from '@shared/services/page-loading.service';
import { LanguageService } from '@shared/services/language.service';
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
  searchForm = this.formBuilder.group({
    keyword: [null],
  });

  totalCustomerBoard = 0;
  customerBoardDataSource: CustomerBoard[] = null;
  customerBoardKrData: CustomerBoardView[] = null;
  customerBoardEnData: CustomerBoardView[] = null;
  customerBoardData: CustomerBoardView[] = null;

  subscription$ = new Subscription();
  searchKeyword: string | null;

  constructor(
    private pageLoadingService: PageLoadingService,
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private translateService: TranslateService,
    private matSnackbarService: MatSnackbarService,
    public languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.loadCustomerBoardList();
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
              'MAT_SNACKBAR__ACTION__NEWS'
            );
            this.matSnackbarService.open(message, action);
          } else {
            // this.onGetResults(response.data.items);
            this.customerBoardDataSource = response?.data?.items || [];
            // this.filteringList(this.customerBoardDataSource);
          }
        },
        complete: () => {
          console.log('this.newsService.search done!!!');
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
