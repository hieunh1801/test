import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Drug } from './drug';
import { DrugKr } from './drug-kr';
import { DrugSynonyms } from './drug-synonyms';
import { DrugService } from '../../services/drug.service';
import { PageLoadingService } from '@shared/services/page-loading.service';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { LanguageService } from '@shared/services/language.service';

@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html',
  styleUrls: ['./drug.component.scss'],
})
export class DrugComponent implements OnInit, OnDestroy {
  subscriptions$ = new Subscription();
  drug: Drug;
  drugId: number;
  noOfGenes: number = 0;
  showGenes: boolean = true;
  exVoca: string[];
  drugSynonyms: Array<DrugSynonyms> | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private drugService: DrugService,
    private pageLoadingService: PageLoadingService,
    private matSnackbarService: MatSnackbarService,
    private translateService: TranslateService,
    public languageService: LanguageService
  ) {}

  ngOnInit(): void {
    const sub = this.route.params.subscribe((params) => {
      this.drugId = +params['id'];
    });
    this.loadDrugDetail();
    this.loadDrugSynonyms();
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
            this.onGetDrug(response.data.items[0]);
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
    this.noOfGenes = !!this.drug.genes ? this.drug.genes.length : 0;
    this.showGenes = !!this.drug.genes;
    if (!!this.drug.externalVocabulary) {
      this.exVoca = this.drug.externalVocabulary.split('\t');
    } else {
      this.exVoca = null;
    }
  }

  loadDrugSynonyms(): void {
    this.pageLoadingService.startLoading();
    this.drugService
      .getDrugSynonymsById(this.drugId)
      .pipe(
        finalize(() => {
          this.pageLoadingService.stopLoading();
        })
      )
      .subscribe({
        next: (response) => {
          if (response?.data?.items?.[0]) {
            this.onGetDrugSynonyms(response.data.items);
          } else {
            this.drugSynonyms = null;
          }
        },
        error: () => {
          const message = this.translateService.instant(
            'PDSS__BROWSER__LOAD_DRUG_SYNONYMS_FAILED'
          );
          const action = this.translateService.instant(
            'MAT_SNACKBAR__ACTION__GET'
          );
          this.matSnackbarService.open(message, action);
        },
      });
  }
  onGetDrugSynonyms(drugSynonyms: Array<DrugSynonyms>): void {
    // this.drugSynonyms = drugSynonyms;

    const tempResults: DrugSynonyms[] = [];

    const brandCount = drugSynonyms.filter((el) => el.type === 'Brand').length;
    const drugCount = drugSynonyms.filter(
      (el) => el.type === 'Generic_Name'
    ).length;

    for (let element of drugSynonyms) {
      if (element.type == 'Brand') {
        tempResults.push(element);
      } else if (element.type == 'Generic_Name') {
        if (brandCount == 0) {
          tempResults.push(element);
        }
      } else if (element.type == 'gene') {
        tempResults.push(element);
      }
    }
    this.drugSynonyms = tempResults;
  }
}
