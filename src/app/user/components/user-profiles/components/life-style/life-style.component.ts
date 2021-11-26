import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  ConfirmDialogComponent,
  ConfirmDialogInput,
  ConfirmDialogOutput,
} from '@shared/components/confirm-dialog/confirm-dialog.component';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import {
  LifeStyleHistoryPostRequest,
  UserLifeStyleService,
} from '@user/services/user-life-style.service';
import { LifeStyleHistory } from '@user/services/user-profile.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-life-style',
  templateUrl: './life-style.component.html',
  styleUrls: ['./life-style.component.scss'],
})
export class LifeStyleComponent implements OnInit, OnDestroy {
  @Input() lifeStyleHistoryList$ = new BehaviorSubject<LifeStyleHistory[]>(
    null
  );

  lifeStyleHistoryList: LifeStyleHistory[] = null;

  mode$ = new BehaviorSubject<'VIEW' | 'EDIT' | 'ADD'>(null);

  subscription$ = new Subscription();

  constructor(
    private lifeStyleService: UserLifeStyleService,
    private matSnackbarService: MatSnackbarService,
    private matDialog: MatDialog,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.initState();
    this.subscribeLifeStyleHistoryListChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  initState(): void {
    this.mode$.next('VIEW');
  }

  reloadLifeStyleHistoryList(callbackFunc: Function): void {
    this.lifeStyleService.getAllUserLifeStyleHistory().subscribe((response) => {
      const isSuccess = response?.status?.code === 'success';
      if (isSuccess) {
        const lifeStyleHistoryList = response?.data?.items || [];
        this.lifeStyleHistoryList$.next(lifeStyleHistoryList);

        if (!lifeStyleHistoryList || lifeStyleHistoryList.length === 0) {
          this.changeMode('VIEW');
        }

        if (callbackFunc) {
          callbackFunc();
        }
      }
    });
  }

  subscribeLifeStyleHistoryListChange(): void {
    const sub = this.lifeStyleHistoryList$
      .pipe(distinctUntilChanged())
      .subscribe((lifeStyleHistoryList) => {
        this.lifeStyleHistoryList = lifeStyleHistoryList;
      });
    this.subscription$.add(sub);
  }

  deleteItem(lifeStyleHistoryId: number): void {
    if (!!lifeStyleHistoryId) {
      const dialogInput: ConfirmDialogInput = {
        title: this.translateService.instant(
          'USER__USER_PROFILES__LIFE_STYLE_LIST__CONFIRM_DELETE_DIALOG_TITLE'
        ),
        content: this.translateService.instant(
          'USER__USER_PROFILES__LIFE_STYLE_LIST__CONFIRM_DELETE_DIALOG_CONTENT'
        ),
      };

      const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
        data: dialogInput,
      });

      dialogRef.afterClosed().subscribe((dialogOutput: ConfirmDialogOutput) => {
        if (dialogOutput?.action === 'yes') {
          this.lifeStyleService
            .deleteUserLifeStyleHistory(lifeStyleHistoryId)
            .subscribe({
              next: (response) => {
                const isSuccess = response?.status?.code === 'success';
                if (isSuccess) {
                  this.reloadLifeStyleHistoryList(null);
                  this.matSnackbarService.openDeleteSuccess();
                } else {
                  this.matSnackbarService.openDeleteFailed();
                }
              },
              error: (error) => {
                console.error(error);
                this.matSnackbarService.openDeleteFailed();
              },
            });
        }
      });
    }
  }

  postData(postRequest: LifeStyleHistoryPostRequest): void {
    this.lifeStyleService.postUserLifeStyleHistory(postRequest).subscribe({
      next: (response) => {
        const isSuccess = response?.status?.code === 'success';
        if (isSuccess) {
          this.matSnackbarService.openCreateSuccess();
          this.reloadLifeStyleHistoryList(() => {
            this.changeMode('VIEW');
          });
        } else {
          this.matSnackbarService.openCreateFailed();
        }
      },
      error: (error) => {
        console.error(error);
        this.matSnackbarService.openCreateFailed();
      },
    });
  }

  changeMode(mode: 'VIEW' | 'EDIT' | 'ADD'): void {
    this.mode$.next(mode);
  }
}
