import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
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
import { UserMedicalHistoryService } from 'src/app/user/services/user-medical-history.service';
import { MedicalHistory } from 'src/app/user/services/user-profile.service';

@Component({
  selector: 'app-medical-history-list-edit',
  templateUrl: './medical-history-list-edit.component.html',
  styleUrls: ['./medical-history-list-edit.component.scss'],
})
export class MedicalHistoryListEditComponent implements OnInit, OnDestroy {
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

  loadMedicalHistoryList(): void {
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

  toggleEdit(medicalHistoryId: number): void {
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

            if (isSuccess) {
              this.loadMedicalHistoryList();
              this.toggleEdit(medicalHistoryId);
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
              if (response?.status?.code === 'success') {
                this.loadMedicalHistoryList();
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
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
  cancelClick(): void {
    this.cancelEvent.emit();
  }
}
