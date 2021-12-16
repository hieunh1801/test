import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Drug } from './drug';
import { DrugKr } from './drug-kr';
import { DrugSynonyms } from './drug-synonyms';
import { DrugService, SearchRequest } from '../../services/drug.service';
import { PageLoadingService } from '@shared/services/page-loading.service';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { LanguageService } from '@shared/services/language.service';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { CloseAccountComponent } from '@user/components/user-settings/components/account-setting/components/close-account/close-account.component';

@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html',
  styleUrls: ['./drug.component.scss'],
})
export class DrugComponent implements OnInit, OnDestroy {
  subscriptions$ = new Subscription();
  drug: Drug;
  drugId: number;
  drugIdFromDB: number;
  drugName: string;
  noOfGenes: number = 0;
  showGenes: boolean = true;
  exVoca: string[];
  drugSynonyms: Array<DrugSynonyms> | null;
  drugSynonymsShowMore = false;

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
      this.drugName = params['id'];
      if (this.drugName.length < 4) {
        this.loadDrugDetail();
      } else {
        if (this.languageService.currentLanguage == 'en') {
          this.loadDrugDetailFromName();
        } else if (this.languageService.currentLanguage == 'kr') {
          this.loadDrugDetailFromKrName();
        }
      }
    });
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
    this.drugIdFromDB = +drug.id;
    this.noOfGenes = !!this.drug.genes ? this.drug?.genes?.length : 0;
    this.showGenes = !!this.drug.genes;
    if (!!this.drug.externalVocabulary) {
      this.exVoca = this.drug.externalVocabulary.split('\t');
    } else {
      this.exVoca = null;
    }
    this.loadDrugSynonyms(this.drugIdFromDB);
  }

  loadDrugSynonyms(drugId: number): void {
    this.pageLoadingService.startLoading();
    this.drugService
      .getDrugSynonymsById(drugId)
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

  loadDrugDetailFromName(): void {
    this.pageLoadingService.startLoading();

    this.drugService
      .getDrugByName(this.drugName)
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

  loadDrugDetailFromKrName(): void {
    const searchRequest: SearchRequest = {
      keyword: this.drugName,
    };
    this.pageLoadingService.startLoading();

    this.drugService
      .getDrugByKrName(searchRequest)
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
}
