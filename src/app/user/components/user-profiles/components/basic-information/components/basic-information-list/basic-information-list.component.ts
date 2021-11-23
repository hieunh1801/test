import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  ConfirmDialogComponent,
  ConfirmDialogInput,
  ConfirmDialogOutput,
} from '@shared/components/confirm-dialog/confirm-dialog.component';
import { BehaviorSubject, Subscription } from 'rxjs';
import {
  Demographic,
  WeightHeightHistory,
} from 'src/app/user/services/user-profile.service';

@Component({
  selector: 'app-basic-information-list',
  templateUrl: './basic-information-list.component.html',
  styleUrls: ['./basic-information-list.component.scss'],
})
export class BasicInformationListComponent implements OnInit, OnDestroy {
  @Input() demographic$ = new BehaviorSubject<Demographic>(null);

  weightHeightList: WeightHeightHistory[] = null;

  subscription$ = new Subscription();

  constructor(
    private matDialog: MatDialog,
    private translateService: TranslateService
  ) {}

  subscribeDemographicChange(): void {
    const sub = this.demographic$.subscribe((demographic) => {
      this.weightHeightList = demographic?.weightHeightHistories || [];
    });
    this.subscription$.add(sub);
  }

  ngOnInit(): void {
    this.subscribeDemographicChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  deleteItem(id: number): void {
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
        // dleete
      }
    });
  }
}
