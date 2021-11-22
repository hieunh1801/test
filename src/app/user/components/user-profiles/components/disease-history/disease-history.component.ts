import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { PageLoadingService } from '@shared/services/page-loading.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged, finalize } from 'rxjs/operators';
import {
  DiseaseHistoryPostRequest,
  UserDiseaseHistoryService,
} from 'src/app/user/services/user-disease-history.service';
import { DiseaseHistory } from 'src/app/user/services/user-profile.service';

@Component({
  selector: 'app-disease-history',
  templateUrl: './disease-history.component.html',
  styleUrls: ['./disease-history.component.scss'],
})
export class DiseaseHistoryComponent implements OnInit, OnDestroy {
  @Input() diseaseHistoryList$ = new BehaviorSubject<DiseaseHistory[]>(null);

  diseaseHistoryList: DiseaseHistory[] = [];
  subscription$ = new Subscription();

  mode: 'VIEW' | 'ADD' | 'EDIT' = 'VIEW';

  constructor(
    private userDiseaseHistoryService: UserDiseaseHistoryService,
    private pageLoadingService: PageLoadingService,
    private matSnackbarService: MatSnackbarService,
    private translateService: TranslateService
  ) {}

  subscribeDiseaseHistoryListChange(): void {
    const sub = this.diseaseHistoryList$
      .pipe(distinctUntilChanged())
      .subscribe((data) => {
        console.log(data);
        this.diseaseHistoryList = data;
      });
    this.subscription$.add(sub);
  }

  reloadDiseaseHistoryList(): void {
    this.userDiseaseHistoryService
      .getAllUserDiseaseHistory()
      .subscribe((response) => {
        const data = response?.data?.items || null;
        if (data) {
          this.diseaseHistoryList$.next(data);
          this.changeMode('VIEW');
        }
      });
  }

  changeMode(mode: 'VIEW' | 'ADD' | 'EDIT'): void {
    if (mode) {
      this.mode = mode;
    }
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
          this.matSnackbarService.openCreateSuccess();
        } else {
          this.matSnackbarService.openCreateFailed();
        }
      });
  }
}
