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
  MedicalHistoryPostRequest,
  MedicalHistoryPutRequest,
  UserMedicalHistoryService,
} from '@user/services/user-medical-history.service';
import { MedicalHistory } from '@user/services/user-profile.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss'],
})
export class MedicalHistoryComponent implements OnInit, OnDestroy {
  @Input() medicalHistoryList$ = new BehaviorSubject<MedicalHistory[]>([]);

  mode$ = new BehaviorSubject<'VIEW' | 'EDIT' | 'ADD'>('VIEW');
  showLess$ = new BehaviorSubject<boolean>(true);
  subscription$ = new Subscription();

  medicalHistoryList: MedicalHistory[] = [];

  constructor(
    private userMedicalHistoryService: UserMedicalHistoryService,
    private pageLoadingService: PageLoadingService,
    private matSnackbarService: MatSnackbarService,
    private translateService: TranslateService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscribeMedicalHistoryListChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  subscribeMedicalHistoryListChange(): void {
    const sub = this.medicalHistoryList$
      .pipe(distinctUntilChanged())
      .subscribe((data) => {
        this.medicalHistoryList = data;
      });
    this.subscription$.add(sub);
  }

  reloadMedicalHistoryList(): void {
    this.userMedicalHistoryService
      .getAllUserMedicalHistory()
      .subscribe((response) => {
        const data = response?.data?.items || null;
        if (data) {
          this.medicalHistoryList$.next(data);
        }
      });
  }

  changeMode(mode: 'VIEW' | 'EDIT' | 'ADD'): void {
    if (mode) {
      this.mode$.next(mode);
    }
  }

  create(body: MedicalHistoryPostRequest): void {
    this.pageLoadingService.startLoading();

    this.userMedicalHistoryService
      .postUserMedicalHistory(body)
      .pipe(
        finalize(() => {
          this.pageLoadingService.stopLoading();
        })
      )
      .subscribe((response: SpmedResponse<MedicalHistory>) => {
        const statusResponse = response.status;
        const isSuccess = statusResponse.code === 'success';
        if (isSuccess) {
          this.reloadMedicalHistoryList();
          this.matSnackbarService.openCreateSuccess();
        } else {
          this.matSnackbarService.openCreateFailed();
        }
      });
  }

  showLessEvent({ showLess }: { showLess: boolean }): void {
    this.showLess$.next(showLess);
  }

  updateItem({
    medicalHistoryId,
    putRequest,
  }: {
    medicalHistoryId: number;
    putRequest: MedicalHistoryPutRequest;
  }): void {
    if (medicalHistoryId) {
      this.userMedicalHistoryService
        .putUserMedicalHistory(medicalHistoryId, putRequest)
        .subscribe({
          next: (response) => {
            const isSuccess = response?.status?.code === 'success';
            if (isSuccess) {
              this.reloadMedicalHistoryList();
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

  deleteItem({ medicalHistoryId }: { medicalHistoryId: number }): void {
    if (!medicalHistoryId) {
      return;
    }
    const dialogInput: ConfirmDialogInput = {
      title: this.translateService.instant(
        'USER__USER_PROFILES__MEDICAL_HISTORY__MEDICAL_HISTORY_LIST_EDIT__CONFIRM_DELETE__CONFIRM_DELETE'
      ),
      content: this.translateService.instant(
        'USER__USER_PROFILES__MEDICAL_HISTORY__MEDICAL_HISTORY_LIST_EDIT__CONFIRM_DELETE__ARE_YOUR_SURE_TO_DELETE'
      ),
    };
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: dialogInput,
    });
    dialogRef.afterClosed().subscribe((dialogOutput: ConfirmDialogOutput) => {
      if (dialogOutput.action === 'yes') {
        this.userMedicalHistoryService
          .deleteUserMedicalHistory(medicalHistoryId)
          .subscribe({
            next: (response) => {
              if (response?.status?.code === 'success') {
                this.reloadMedicalHistoryList();
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
}
