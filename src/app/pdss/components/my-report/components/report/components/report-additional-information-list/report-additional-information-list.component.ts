import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  PdssReportService,
  ReportAdditionalInformation,
} from '@pdss/components/my-report/services/pdss-report.service';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-report-additional-information-list',
  templateUrl: './report-additional-information-list.component.html',
  styleUrls: ['./report-additional-information-list.component.scss'],
})
export class ReportAdditionalInformationListComponent
  implements OnInit, OnDestroy
{
  @Input() productCode: string;
  @Input() patient: number;

  additionalInformationListGroup: Array<ReportAdditionalInformation[]> = [];

  additionalInformationList$ = new BehaviorSubject<
    ReportAdditionalInformation[]
  >([]);

  subscription$ = new Subscription();

  constructor(
    private pdssReportService: PdssReportService,
    private matSnackbarService: MatSnackbarService,
    private translateService: TranslateService
  ) {}

  loadAdditionalInformationList(): void {
    this.pdssReportService.getReportAdditionalInformation().subscribe({
      next: (response) => {
        const nextValue = response?.data?.items || [];
        this.additionalInformationList$.next(nextValue);
      },
      error: () => {
        const message = this.translateService.instant(
          'PDSS__MY_REPORTS__REPORT__ADDITIONAL_INFORMATION_LIST__GET_ADDITIONAL_INFORMATION_FAILED'
        );
        const action = this.translateService.instant(
          'PDSS__MY_REPORTS__REPORT__ADDITIONAL_INFORMATION_LIST__GET_ACTION'
        );
        this.matSnackbarService.open(message, action);
      },
    });
  }

  subscribeAdditionalInformationListChange(): void {
    const sub = this.additionalInformationList$.subscribe({
      next: (dataList) => {
        try {
          if (dataList && dataList.length > 0) {
            const additionalInformationListGroupObject = {};
            for (const dataListItem of dataList) {
              const group = dataListItem.group;
              const order = dataListItem.order;
              if (additionalInformationListGroupObject[group]) {
                additionalInformationListGroupObject[group][order] =
                  dataListItem;
              } else {
                const newList = [];
                newList[order] = dataListItem;
                additionalInformationListGroupObject[group] = newList;
              }
            }

            const mAdditionalInformationListGroup = [];
            for (const index in additionalInformationListGroupObject) {
              if (index) {
                mAdditionalInformationListGroup[index] =
                  additionalInformationListGroupObject[index];
              }
            }
            this.additionalInformationListGroup =
              mAdditionalInformationListGroup;
            console.log(this.additionalInformationListGroup);
          }
        } catch (error) {
          console.error(error);
        }
      },
    });
    this.subscription$.add(sub);
  }

  ngOnInit(): void {
    this.subscribeAdditionalInformationListChange();

    this.loadAdditionalInformationList();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
