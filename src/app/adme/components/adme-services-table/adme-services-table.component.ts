import {
  AdmeService,
  AdmeServiceDataService,
  AdmeServiceMainCategory,
} from '@adme/services/adme-service-data.service';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { BehaviorSubject, Subscription } from 'rxjs';
import { finalize, retry } from 'rxjs/operators';

@Component({
  selector: 'app-adme-services-table',
  templateUrl: './adme-services-table.component.html',
  styleUrls: ['./adme-services-table.component.scss'],
})
export class AdmeServicesTableComponent implements OnInit, OnDestroy {
  admeServiceMainCategoryList$ = new BehaviorSubject<AdmeServiceMainCategory[]>(
    null
  );
  admeServiceMainCategoryLoading: boolean = false;

  subscriptions = new Subscription();

  tableSource$ = new BehaviorSubject<AdmeServiceRow[]>(null);

  tableHeaderList = ['Main Category', 'Subclass', '', 'Technology'];

  showButtonScrollToServicesTable: boolean = false;
  checkAll: boolean = false;

  constructor(
    private admeServiceDataService: AdmeServiceDataService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.subscribeAdmeServiceMainCategoryList$();
    this.loadAdmeServiceMainCategoryList$();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  subscribeAdmeServiceMainCategoryList$(): void {
    this.subscriptions.add(
      this.admeServiceMainCategoryList$.subscribe(() => {
        this.reloadTableSource();
      })
    );
  }

  loadAdmeServiceMainCategoryList$(): void {
    this.admeServiceMainCategoryLoading = true;
    this.admeServiceDataService
      .getAllAdmeServiceMainCategory()
      .pipe(
        retry(3),
        finalize(() => {
          this.admeServiceMainCategoryLoading = false;
        })
      )
      .subscribe((response) => {
        const data = response?.data?.items || null;
        this.admeServiceMainCategoryList$.next(data);
      });
  }

  reloadTableSource(): void {
    const admeServiceMainCategoryList =
      this.admeServiceMainCategoryList$?.getValue() || [];
    const admeServiceList: AdmeServiceRowNormalize[] = [];
    for (const mainCategory of admeServiceMainCategoryList) {
      for (const subCategory of mainCategory.subCategories || []) {
        for (const admeService of subCategory.admeServices || []) {
          const normalizeData: AdmeServiceRowNormalize = {
            id: admeService.id,
            mainCategory: mainCategory.title,
            subclass: subCategory.title,
            technology: admeService.title,
          };
          admeServiceList.push(normalizeData);
        }
      }
    }

    let tableSource: AdmeServiceRow[] = [];

    if (admeServiceList) {
      // step 1: count
      const mainCategoryCountMap = new Map<string, number>();
      const subclassCountMap = new Map<string, number>();

      for (const admeService of admeServiceList) {
        const { mainCategory, subclass } = admeService;
        const mainCategoryCount = mainCategoryCountMap.get(mainCategory) || 0;
        const subclassCount = subclassCountMap.get(subclass) || 0;

        mainCategoryCountMap.set(mainCategory, mainCategoryCount + 1);
        subclassCountMap.set(subclass, subclassCount + 1);
      }

      // step 2: build table source
      const mainCategorySet = new Set<string>();
      const subclassSet = new Set<string>();

      for (const admeService of admeServiceList) {
        const { mainCategory, subclass, technology, id } = admeService;

        const mainCategoryCount = mainCategoryCountMap.get(mainCategory) || 0;
        const subclassCount = subclassCountMap.get(subclass) || 0;

        const existedMainCategory = mainCategorySet.has(mainCategory);
        const existedSubclass = subclassSet.has(subclass);

        const tableRow: AdmeServiceRow = {
          id: id,
          mainCategory: {
            value: mainCategory,
            rowSpan: existedMainCategory ? 0 : mainCategoryCount,
          },
          subclass: {
            value: subclass,
            rowSpan: existedSubclass ? 0 : subclassCount,
          },
          technology: {
            value: technology,
            rowSpan: 1,
          },
        };

        tableSource.push(tableRow);

        if (!existedMainCategory) {
          mainCategorySet.add(mainCategory);
        }
        if (!existedSubclass) {
          subclassSet.add(subclass);
        }
      }
    }

    this.tableSource$.next(tableSource);
  }

  toggleSelectItem($event: MatCheckboxChange, tableRow: AdmeServiceRow): void {
    if (!$event.checked) {
      this.checkAll = false;
    }

    const tableSource = this.tableSource$?.getValue().map((row) => {
      return row.id === tableRow.id
        ? { ...row, selected: $event.checked }
        : row;
    });

    this.tableSource$.next(tableSource);
  }

  toggleAll($event: MatCheckboxChange): void {
    this.checkAll = $event.checked;
    const tableSource = this.tableSource$?.getValue().map((row) => ({
      ...row,
      selected: $event.checked,
    }));
    this.tableSource$.next(tableSource);
  }
}

interface AdmeServiceRowNormalize {
  id: number;
  mainCategory: string;
  subclass: string;
  technology: string;
}

export interface AdmeServiceRow {
  id: number;
  mainCategory: CellMetadata<string>;
  subclass: CellMetadata<string>;
  technology: CellMetadata<string>;
  selected?: boolean;
}

export interface CellMetadata<T> {
  value: T;
  rowSpan: number;
}
