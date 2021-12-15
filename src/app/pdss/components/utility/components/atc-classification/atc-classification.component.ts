import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Drug } from '@pdss/components/browser/components/drug/drug';
import { PageLoadingService } from '@shared/services/page-loading.service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  AtcDrugSearchRequest,
  PdssDrugService,
} from '../../services/pdss-drug.service';

@Component({
  selector: 'app-atc-classification',
  templateUrl: './atc-classification.component.html',
  styleUrls: ['./atc-classification.component.scss'],
})
export class AtcClassificationComponent implements OnInit, OnDestroy {
  drugList$ = new BehaviorSubject<Drug[]>(null);

  constructor(
    private pdssDrugService: PdssDrugService,
    private pageLoadingService: PageLoadingService
  ) {}

  ngOnInit(): void {
    this._loadDrug();
  }

  ngOnDestroy(): void {}

  private _loadDrug(): void {
    const pageIndex = 0;
    const pageSize = 9999;
    const searchRequest: AtcDrugSearchRequest = {
      // level1: 'B',
      // level2: 'B02',
      // level3: 'B02B',
      // level4: 'B02BA',
      level1: '',
      level2: '',
      level3: '',
      level4: '',
    };
    this.pageLoadingService.startLoading();
    this.pdssDrugService
      .searchDrugsByAtcCode(pageIndex, pageSize, searchRequest)
      .pipe(
        finalize(() => {
          this.pageLoadingService.stopLoading();
        })
      )
      .subscribe((response) => {
        const drugList = response?.data?.items || [];
        const flattedDrugList = [];
        for (const drug of drugList) {
          for (const atc of drug.atcCodes || []) {
            flattedDrugList.push({
              ...drug,
              atcCodes: [atc],
            });
          }
        }
        this.drugList$.next(flattedDrugList);
      });
  }
}
