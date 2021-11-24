import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Drug } from './drug';
import { DrugKr } from './drug-kr';
import { DrugService } from '../../services/drug.service';
import { PageLoadingService } from '@shared/services/page-loading.service';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html',
  styleUrls: ['./drug.component.scss'],
})
export class DrugComponent implements OnInit, OnDestroy {
  subscriptions$ = new Subscription();
  drug: Drug;
  drugId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private drugService: DrugService,
    private pageLoadingService: PageLoadingService,
    private matSnackbarService: MatSnackbarService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    const sub = this.route.params.subscribe((params) => {
      this.drugId = +params['id'];
    });
    this.loadDrugDetail();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  loadDrugDetail(): void {
    this.pageLoadingService.startLoading();
    this.drugService
      .getById(this.drugId)
      .pipe(
        finalize(() => {
          this.pageLoadingService.stopLoading();
        })
      )
      .subscribe({
        next: (response) => {
          if (response?.data?.items?.[0]) {
            this.onGetDrug(response.data.items);
          } else {
            this.drug = null;
          }
        },
        error: () => {
          const message = this.translateService.instant(
            'PDSS__BROWSER__LOAD_DRUG_FAILED'
          );
          const action = this.translateService.instant(
            'MAT_SNACKBAR__ACTION__GET'
          );
          this.matSnackbarService.open(message, action);
        },
      });
  }

  onGetDrug(drug: Drug): void {
    this.drug = drug;
  }
}
