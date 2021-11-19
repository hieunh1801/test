import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  ConfirmDialogComponent,
  ConfirmDialogInput,
  ConfirmDialogOutput,
} from '@shared/components/confirm-dialog/confirm-dialog.component';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import {
  MedicalHistoryPutRequest,
  UserMedicalHistoryService,
} from 'src/app/user/services/user-medical-history.service';
import { MedicalHistory } from 'src/app/user/services/user-profile.service';

@Component({
  selector: 'app-medical-history-list-edit',
  templateUrl: './medical-history-list-edit.component.html',
  styleUrls: ['./medical-history-list-edit.component.scss'],
})
export class MedicalHistoryListEditComponent implements OnInit {
  @Input() medicalHistoryList$ = new BehaviorSubject<MedicalHistory[]>([]);
  @Output() cancelEvent = new EventEmitter();

  medicalHistoryList: MedicalHistory[] = [];
  medicalHistoryEditIdSet = new Set();

  subscription$ = new Subscription();

  constructor(
    private userMedicalHistoryService: UserMedicalHistoryService,
    private translateService: TranslateService,
    private matSnackbarService: MatSnackbarService,
    private matDialog: MatDialog
  ) {}

  loadMedicalHistory(): void {
    this.userMedicalHistoryService
      .getAllUserMedicalHistory()
      .subscribe((response) => {
        const mMedicalHistoryList = response?.data?.items || [];
        this.medicalHistoryList$.next(mMedicalHistoryList);
      });
  }

  isEditItem(medicalHistory: MedicalHistory): boolean {
    const id = (medicalHistory && medicalHistory.id) || null;
    return this.medicalHistoryEditIdSet.has(id);
  }

  toggleEdit(medicalHistoryId): void {
    if (!medicalHistoryId) {
      return;
    }

    const mSet = new Set(this.medicalHistoryEditIdSet);
    if (this.medicalHistoryEditIdSet.has(medicalHistoryId)) {
      // existed => remove
      mSet.delete(medicalHistoryId);
    } else {
      mSet.add(medicalHistoryId);
      // not existed => add
    }
    this.medicalHistoryEditIdSet = mSet;
  }

  updateItem({ medicalHistoryId, putRequest }): void {
    if (medicalHistoryId) {
      this.userMedicalHistoryService
        .putUserMedicalHistory(medicalHistoryId, putRequest)
        .subscribe({
          next: (response) => {
            const isSuccess = response?.status?.code === 'success';
            const message = isSuccess
              ? this.translateService.instant('MAT_SNACKBAR__MESSAGES__SUCCESS')
              : this.translateService.instant('MAT_SNACKBAR__MESSAGES__FAILED');
            const action = this.translateService.instant(
              'MAT_SNACKBAR__ACTION__UPDATE'
            );

            this.matSnackbarService.open(message, action);

            if (isSuccess) {
              this.loadMedicalHistory();
              this.toggleEdit(medicalHistoryId);
            }
          },
        });
    }
  }

  deleteItem(medicalHistoryId: number): void {
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
              const isSuccess = response?.status?.code === 'success';
              const message = isSuccess
                ? this.translateService.instant(
                    'MAT_SNACKBAR__MESSAGES__SUCCESS'
                  )
                : this.translateService.instant(
                    'MAT_SNACKBAR__MESSAGES__FAILED'
                  );
              const action = this.translateService.instant(
                'MAT_SNACKBAR__ACTION__DELETE'
              );

              this.matSnackbarService.open(message, action);

              if (isSuccess) {
                this.loadMedicalHistory();
              }
            },
          });
      }
    });
  }

  loadMedicalHistoryList(): void {}

  subscribeMedicalHistoryListChange(): void {
    const sub = this.medicalHistoryList$
      .pipe(distinctUntilChanged())
      .subscribe((mMedicalHistoryList) => {
        this.medicalHistoryList = mMedicalHistoryList;
      });

    this.subscription$.add(sub);
  }

  ngOnInit(): void {
    this.subscribeMedicalHistoryListChange();
  }

  cancelClick(): void {
    this.cancelEvent.emit();
  }
}
