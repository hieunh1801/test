import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
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
import { UserDiseaseHistoryService } from 'src/app/user/services/user-disease-history.service';
import { DiseaseHistory } from 'src/app/user/services/user-profile.service';

@Component({
  selector: 'app-disease-history-list',
  templateUrl: './disease-history-list.component.html',
  styleUrls: ['./disease-history-list.component.scss'],
})
export class DiseaseHistoryListComponent
  implements OnInit, OnDestroy, OnChanges
{
  @Input() diseaseHistoryList$ = new BehaviorSubject<DiseaseHistory[]>([]);
  @Input() mode: 'VIEW' | 'EDIT' = 'VIEW';

  @Output() cancelEvent = new EventEmitter();

  dataSource: DiseaseHistory[] = [];
  diseaseHistoryEditIdSet = new Set();

  subscription$ = new Subscription();
  showLess$ = new BehaviorSubject<boolean>(true);

  constructor(
    private userDiseaseHistoryService: UserDiseaseHistoryService,
    private translateService: TranslateService,
    private matSnackbarService: MatSnackbarService,
    private matDialog: MatDialog
  ) {}

  loadDiseaseHistoryList(): void {
    this.userDiseaseHistoryService
      .getAllUserDiseaseHistory()
      .subscribe((response) => {
        this.diseaseHistoryList$.next(response?.data?.items || []);
      });
  }

  isEditItem(diseaseHistoryId: number): boolean {
    return this.diseaseHistoryEditIdSet.has(diseaseHistoryId);
  }

  toggleEdit(diseaseHistoryId: number): void {
    if (!diseaseHistoryId) {
      return;
    }

    const mSet = new Set(this.diseaseHistoryEditIdSet);
    if (this.diseaseHistoryEditIdSet.has(diseaseHistoryId)) {
      // existed => remove
      mSet.delete(diseaseHistoryId);
    } else {
      mSet.add(diseaseHistoryId);
      // not existed => add
    }
    this.diseaseHistoryEditIdSet = mSet;
  }

  updateItem({ diseaseHistoryId, putRequest }): void {
    if (diseaseHistoryId) {
      this.userDiseaseHistoryService
        .putUserDiseaseHistory(diseaseHistoryId, putRequest)
        .subscribe({
          next: (response) => {
            if (response?.status?.code === 'success') {
              this.loadDiseaseHistoryList();
              this.toggleEdit(diseaseHistoryId);
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
                this.loadDiseaseHistoryList();
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

  reloadDataSource(): void {
    const showLess = this.showLess$.value;
    const diseaseHistoryList = this.diseaseHistoryList$.value;
    if (this.mode === 'VIEW') {
      if (diseaseHistoryList && diseaseHistoryList.length > 0) {
        if (showLess) {
          this.dataSource = diseaseHistoryList.slice(0, 3);
        } else {
          this.dataSource = diseaseHistoryList;
        }
      }
    } else {
      this.dataSource = diseaseHistoryList;
    }
  }

  subscribeShowLessChange(): void {
    const sub = this.showLess$.pipe(distinctUntilChanged()).subscribe(() => {
      this.reloadDataSource();
    });

    this.subscription$.add(sub);
  }
  subscribeDiseaseHistoryListChange(): void {
    const sub = this.diseaseHistoryList$
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.reloadDataSource();
      });

    this.subscription$.add(sub);
  }
  ngOnInit(): void {
    this.subscribeDiseaseHistoryListChange();
    this.subscribeShowLessChange();
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const modeSimpleChange: SimpleChange = simpleChanges.mode;
    if (
      modeSimpleChange &&
      modeSimpleChange.currentValue !== modeSimpleChange.previousValue
    ) {
      this.reloadDataSource();
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
  cancelClick(): void {
    this.cancelEvent.emit();
  }
}
