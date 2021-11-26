import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  ConfirmDialogComponent,
  ConfirmDialogInput,
  ConfirmDialogOutput,
} from '@shared/components/confirm-dialog/confirm-dialog.component';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { PageLoadingService } from '@shared/services/page-loading.service';
import {
  DiseaseHistoryPostRequest,
  DiseaseHistoryPutRequest,
  UserDiseaseHistoryService,
} from '@user/services/user-disease-history.service';
import { DiseaseHistory } from '@user/services/user-profile.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-disease-history',
  templateUrl: './disease-history.component.html',
  styleUrls: ['./disease-history.component.scss'],
})
export class DiseaseHistoryComponent implements OnInit, OnDestroy {
  @Input() diseaseHistoryList$ = new BehaviorSubject<DiseaseHistory[]>(null);
  showLess$ = new BehaviorSubject<boolean>(true);
  mode$ = new BehaviorSubject<'VIEW' | 'ADD' | 'EDIT'>('VIEW');

  subscription$ = new Subscription();

  diseaseHistoryList: DiseaseHistory[] = [];

  constructor(
    private userDiseaseHistoryService: UserDiseaseHistoryService,
    private pageLoadingService: PageLoadingService,
    private matSnackbarService: MatSnackbarService,
    private translateService: TranslateService,
    private matDialog: MatDialog
  ) {}

  subscribeDiseaseHistoryListChange(): void {
    const sub = this.diseaseHistoryList$
      .pipe(distinctUntilChanged())
      .subscribe((data) => {
        this.diseaseHistoryList = data;
      });
    this.subscription$.add(sub);
  }

  reloadDiseaseHistoryList(): void {
    this.userDiseaseHistoryService
      .getAllUserDiseaseHistory()
      .subscribe((response) => {
        const data = response?.data?.items || null;
        this.diseaseHistoryList$.next(data);
        if (!data || data.length === 0) {
          this.changeMode('VIEW');
        }
      });
  }

  changeShowLess({ showLess }: { showLess: boolean }): void {
    this.showLess$.next(showLess);
  }

  changeMode(mode: 'VIEW' | 'ADD' | 'EDIT'): void {
    this.mode$.next(mode);
  }

  ngOnInit(): void {
    this.subscribeDiseaseHistoryListChange();
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  create(body: DiseaseHistoryPostRequest): void {
    this.pageLoadingService.startLoading();

    this.userDiseaseHistoryService
      .postUserDiseaseHistory(body)
      .pipe(
        finalize(() => {
          this.pageLoadingService.stopLoading();
        })
      )
      .subscribe((response: SpmedResponse<DiseaseHistory>) => {
        const statusResponse = response.status;
        const isSuccess = statusResponse.code === 'success';
        if (isSuccess) {
          this.reloadDiseaseHistoryList();
          this.changeMode('VIEW');
          this.matSnackbarService.openCreateSuccess();
        } else {
          this.matSnackbarService.openCreateFailed();
        }
      });
  }

  deleteItem(diseaseHistoryId: number): void {
    if (!diseaseHistoryId) {
      return;
    }
    const dialogInput: ConfirmDialogInput = {
      title: this.translateService.instant(
        'USER__USER_PROFILES__DISEASE_HISTORY__DISEASE_HISTORY_LIST__CONFIRM_DELETE__CONFIRM_DELETE'
      ),
      content: this.translateService.instant(
        'USER__USER_PROFILES__DISEASE_HISTORY__DISEASE_HISTORY_LIST__CONFIRM_DELETE__ARE_YOUR_SURE_TO_DELETE'
      ),
    };
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: dialogInput,
    });
    dialogRef.afterClosed().subscribe((dialogOutput: ConfirmDialogOutput) => {
      if (dialogOutput.action === 'yes') {
        this.userDiseaseHistoryService
          .deleteUserDiseaseHistory(diseaseHistoryId)
          .subscribe({
            next: (response) => {
              if (response?.status?.code === 'success') {
                this.reloadDiseaseHistoryList();
                this.matSnackbarService.openDeleteSuccess();
              } else {
                this.matSnackbarService.openDeleteFailed();
              }
            },
            error: (error) => {
              console.error(error);
              this.matSnackbarService.openUpdateFailed();
            },
          });
      }
    });
  }

  updateItem({
    diseaseHistoryId,
    putRequest,
  }: {
    diseaseHistoryId: number;
    putRequest: DiseaseHistoryPutRequest;
  }): void {
    if (diseaseHistoryId) {
      this.userDiseaseHistoryService
        .putUserDiseaseHistory(diseaseHistoryId, putRequest)
        .subscribe({
          next: (response) => {
            if (response?.status?.code === 'success') {
              this.reloadDiseaseHistoryList();
              this.matSnackbarService.openUpdateSuccess();
            } else {
              this.matSnackbarService.openUpdateFailed();
            }
          },
          error: (error) => {
            console.error(error);
            this.matSnackbarService.openUpdateFailed();
          },
        });
    }
  }
}
