import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@shared/services/language.service';
import { PageLoadingService } from '@shared/services/page-loading.service';
import {
  NewsService,
  CustomerBoard,
  CustomerBoardAttachment,
  CustomerBoardAttachmentKr,
} from '../../services/news.service';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent implements OnInit, OnDestroy {
  customerBoardDataSource: CustomerBoard[] = null;
  customerBoard: CustomerBoard = null;
  boardId: number = null;

  customerBoardAttachment: CustomerBoardAttachment[] = null;
  isBoardAttachmentEn = false;

  constructor(
    private translateService: TranslateService,
    private pageLoadingService: PageLoadingService,
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private matSnackbarService: MatSnackbarService,
    private router: Router,
    public languageService: LanguageService
  ) {}

  ngOnInit(): void {
    const boardId = this.activatedRoute.snapshot.params?.id || null;
    this.boardId = boardId;
    if (!!boardId) {
      this.loadNewsById(boardId);
      this.loadCustomerBoardAttachmentById(boardId);
      this.updateReadCount();
    }
  }

  ngOnDestroy(): void {}

  loadNewsById(boardId: number): void {
    this.newsService.getCustomerBoardById(boardId).subscribe({
      next: (response) => {
        const customerBoard: CustomerBoard = response?.data?.items?.[0] || null;
        if (customerBoard) {
          this.customerBoard = customerBoard;
          this.loadCustomerBoardList();
        } else {
          throw new Error('Get news data by id failed');
        }
      },
      error: (error) => {
        /*
          const message2 = this.translateService.instant(
          'PDSS__BROWSER__SERVER__NOT__RESPONSE'
        );
        const action2 = this.translateService.instant(
          'MAT_SNACKBAR__ACTION__BROWSER'
        );
        this.matSnackbarService.open(message2, action2);
        */
        const message =
          error?.error?.status?.code || 'Get news article by id error';
        this.matSnackbarService.open(message, 'Get');
      },
    });
  }

  loadCustomerBoardList(): void {
    this.pageLoadingService.startLoading();
    const boardCategoryId = this.customerBoard.boardCategoryId;
    this.newsService
      .getRecentListFromBoard(parseInt(boardCategoryId))
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
  updateReadCount(): void {
    this.newsService.updateReadCount(this.boardId).subscribe({
      next: (response) => {
        console.log(response?.status?.code);
        if (response?.status?.code === 'success') {
          this.matSnackbarService.open('Update read count success', 'Update');
        } else {
          this.matSnackbarService.open('Update read count fail', 'Update');
        }
      },
      error: (error) => {
        const message = error?.error?.status?.code || 'Update read count error';
        this.matSnackbarService.open(message, 'Update');
      },
    });
  }

  loadCustomerBoardAttachmentById(boardId: number): void {
    this.newsService.getCustomerBoardAttachmentById(boardId).subscribe({
      next: (response) => {
        const boardAttachment = response?.data?.items || null;
        if (boardAttachment) {
          this.customerBoardAttachment = boardAttachment;
          this.isBoardAttachmentEn = true;
        } else {
          throw new Error('Get board attachment by boardId failed');
        }
      },
      error: (error) => {
        const message =
          error?.error?.status?.code || 'Get board attachment error';
        this.matSnackbarService.open(message, 'Get');
      },
    });
  }
}
