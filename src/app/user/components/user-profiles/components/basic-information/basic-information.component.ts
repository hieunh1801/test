import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  ConfirmDialogComponent,
  ConfirmDialogInput,
  ConfirmDialogOutput,
} from '@shared/components/confirm-dialog/confirm-dialog.component';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import {
  UserBasicInformationService,
  WeightHeightHistoryPostRequest,
} from '@user/services/user-basic-information.service';
import { WeightHeightHistory } from '@user/services/user-profile.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.scss'],
})
export class BasicInformationComponent implements OnInit {
  @Input() weightHeightHistoryList$ = new BehaviorSubject<
    WeightHeightHistory[]
  >(null);

  weightHeightHistoryList: WeightHeightHistory[] = null;

  mode: 'VIEW' | 'EDIT' | 'ADD' = null;
  subscription$ = new Subscription();

  constructor(
    private basicInformationService: UserBasicInformationService,
    private matSnackbarService: MatSnackbarService,
    private matDialog: MatDialog,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.initState();
    this.subscribeWeightHeightHistoryListChange();
  }

  initState(): void {
    this.mode = 'VIEW';
  }

  subscribeWeightHeightHistoryListChange(): void {
    const sub = this.weightHeightHistoryList$.subscribe(
      (weightHeightHistoryList) => {
        if (weightHeightHistoryList) {
          const weightHeightHistorySortedList = weightHeightHistoryList.sort(
            (a, b) => Date.parse(b.date) - Date.parse(a.date)
          );
          this.weightHeightHistoryList = weightHeightHistorySortedList;
        }
      }
    );
    this.subscription$.add(sub);
  }

  reloadWeightHeightHistoryList(): void {
    this.basicInformationService
      .getAllUserWeightHeightHistory()
      .subscribe((response) => {
        const weightHeightHistoryList = response?.data?.items || [];
        this.weightHeightHistoryList$.next(weightHeightHistoryList);
        if (!weightHeightHistoryList || weightHeightHistoryList.length === 0) {
          this.changeMode('VIEW');
        }
      });
  }
  deleteItem(id: number): void {
    if (!!id) {
      const dialogInput: ConfirmDialogInput = {
        title: this.translateService.instant(
          'USER__USER_PROFILES__BASIC_INFORMATION_LIST__CONFIRM_DELETE_DIALOG_TITLE'
        ),
        content: this.translateService.instant(
          'USER__USER_PROFILES__BASIC_INFORMATION_LIST__CONFIRM_DELETE_DIALOG_CONTENT'
        ),
      };
      const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
        data: dialogInput,
      });
      dialogRef.afterClosed().subscribe((dialogOutput: ConfirmDialogOutput) => {
        if (dialogOutput?.action === 'yes') {
          this.basicInformationService.deleteWeightHeightHistory(id).subscribe({
            next: (response) => {
              const isSuccess = response?.status?.code === 'success';
              if (isSuccess) {
                this.reloadWeightHeightHistoryList();
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
  postData(postRequest: WeightHeightHistoryPostRequest): void {
    this.basicInformationService
      .postWeightHeightHistory(postRequest)
      .subscribe({
        next: (response) => {
          const isSuccess = response?.status?.code === 'success';
          if (isSuccess) {
            this.matSnackbarService.openCreateSuccess();
            this.reloadWeightHeightHistoryList();
            this.changeMode('VIEW');
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
    this.mode = mode;
  }
}
