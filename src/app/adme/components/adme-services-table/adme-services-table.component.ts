import {
  AdmeService,
  AdmeServiceDataService,
} from '@adme/services/adme-service-data.service';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { BehaviorSubject, Subscription } from 'rxjs';
import { finalize, retry, tap } from 'rxjs/operators';

@Component({
  selector: 'app-adme-services-table',
  templateUrl: './adme-services-table.component.html',
  styleUrls: ['./adme-services-table.component.scss'],
})
export class AdmeServicesTableComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  admeServiceList$ = new BehaviorSubject<AdmeService[]>(null);
  admeServiceList: AdmeService[];
  admeServiceListLoading: boolean = false;

  subscriptions = new Subscription();

  tableSource: AdmeServiceRow[] = [];

  tableHeaderList = ['Main Category', 'Subclass', '', 'Technology'];

  @ViewChild('tableRef') tableRef: ElementRef;

  constructor(private admeServiceDataService: AdmeServiceDataService) {}

  ngOnInit(): void {
    this.subscribeAdmeServiceList$();

    this.loadAdmeServiceList$();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit', this.tableRef);
  }

  subscribeAdmeServiceList$(): void {
    this.subscriptions.add(
      this.admeServiceList$.subscribe(() => this.reloadAdmeServiceList())
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
        console.log('loadAdmeServiceList$', data);
        this.admeServiceList$.next(data);
      });
  }

  reloadAdmeServiceList(): void {
    const admeServiceList = this.admeServiceList$?.getValue();
    this.admeServiceList = admeServiceList;
  }

  reloadTableSource(): void {
    const admeServiceList = this.admeServiceList$?.getValue();
    let tableSource = admeServiceList?.map((admeService) => {
      return {
        mainCategory: { value: admeService.mainCategory, rowSpan: 1 },
        subclass: { value: admeService.subclass, rowSpan: 1 },
        technology: { value: admeService.technology, rowSpan: 1 },
      };
    });
  }
}

interface AdmeServiceRow {
  mainCategory: CellMetadata<string>;
  subclass: CellMetadata<string>;
  technology: CellMetadata<string>;
}

interface CellMetadata<T> {
  value: T;
  rowSpan: number;
}
