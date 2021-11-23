import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { PageLoadingService } from '@shared/services/page-loading.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged, finalize } from 'rxjs/operators';
import {
  MedicalHistoryPostRequest,
  UserMedicalHistoryService,
} from 'src/app/user/services/user-medical-history.service';
import { MedicalHistory } from 'src/app/user/services/user-profile.service';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss'],
})
export class MedicalHistoryComponent implements OnInit, OnDestroy {
  @Input() medicalHistoryList$ = new BehaviorSubject<MedicalHistory[]>([]);

  medicalHistoryList: MedicalHistory[] = [];
  subscription$ = new Subscription();

  MedicalHistoryMode = MedicalHistoryMode;
  mode: MedicalHistoryMode = MedicalHistoryMode.VIEW; // default mode

  constructor(
    private userMedicalHistoryService: UserMedicalHistoryService,
    private pageLoadingService: PageLoadingService,
    private matSnackbarService: MatSnackbarService,
    private translateService: TranslateService
  ) {}

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
          this.changeMode(MedicalHistoryMode.VIEW);
        }
      });
  }

  ngOnInit(): void {
    this.subscribeMedicalHistoryListChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  changeMode(mode: MedicalHistoryMode): void {
    if (mode) {
      this.mode = mode;
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
}

enum MedicalHistoryMode {
  VIEW = 'VIEW',
  ADD = 'add',
  EDIT = 'edit',
  GRAPH = 'graph',
}
