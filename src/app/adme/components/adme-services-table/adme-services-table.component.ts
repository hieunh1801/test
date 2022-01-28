import {
  AdmeService,
  AdmeServiceDataService,
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
  admeServiceList$ = new BehaviorSubject<AdmeService[]>(null);
  admeServiceListLoading: boolean = false;

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
    this.subscribeAdmeServiceList$();

    this.loadAdmeServiceList$();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  subscribeAdmeServiceList$(): void {
    this.subscriptions.add(
      this.admeServiceList$.subscribe(() => {
        this.reloadTableSource();
      })
    );
  }

  loadAdmeServiceList$(): void {
    this.admeServiceListLoading = true;
    this.admeServiceDataService
      .getAllAdmeService()
      .pipe(
        retry(3),
        finalize(() => {
          this.admeServiceListLoading = false;
        })
      )
      .subscribe((response) => {
        const data = response?.data?.items || null;
        this.admeServiceList$.next(data);
      });
  }

  reloadTableSource(): void {
    const admeServiceList = this.admeServiceList$?.getValue();
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
