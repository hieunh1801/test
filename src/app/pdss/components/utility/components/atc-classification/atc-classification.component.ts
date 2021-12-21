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
      .searchDrugsByAtcCode(pageIndex, pageSize, '', searchRequest)
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

        const sortFunction = (a: Drug, b: Drug) => {
          const compareResult = 0;
          // atc code level 1
          const atcCodeA = a?.atcCodes?.[0];
          const atcCodeB = b?.atcCodes?.[0];

          const compareResultCodeLevel1 = atcCodeA?.codeLevel1?.localeCompare(
            atcCodeB?.codeLevel1
          );
          if (compareResultCodeLevel1 !== 0) {
            return compareResultCodeLevel1;
          }

          const compareResultCodeLevel2 = atcCodeA?.codeLevel2?.localeCompare(
            atcCodeB?.codeLevel2
          );
          if (compareResultCodeLevel2 !== 0) {
            return compareResultCodeLevel2;
          }

          const compareResultCodeLevel3 = atcCodeA?.codeLevel3?.localeCompare(
            atcCodeB?.codeLevel3
          );
          if (compareResultCodeLevel3 !== 0) {
            return compareResultCodeLevel3;
          }

          const compareResultCodeLevel4 = atcCodeA?.codeLevel4?.localeCompare(
            atcCodeB?.codeLevel4
          );
          if (compareResultCodeLevel4 !== 0) {
            return compareResultCodeLevel4;
          }

          const compareResultName = a.name.localeCompare(b.name);
          return compareResultName;
        };
        const flattedSortedDrugList = flattedDrugList.sort(sortFunction);
        this.drugList$.next(flattedSortedDrugList);
      });
  }
}
