import {
  Component,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { PageLoadingService } from '@shared/services/page-loading.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  BrowserService,
  SearchRequest,
  SearchResponse,
} from './services/browser.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss'],
})
export class BrowserComponent implements OnInit, OnDestroy, AfterViewInit {
  searchForm = this.formBuilder.group({
    keyword: ['', Validators.required],
  });

  filterForm = this.formBuilder.group({
    isBrand: [''],
    isDrug: [''],
    isGene: [''],
  });

  subscription$ = new Subscription();
  pageChangeSub$: Subscription;

  listOfDrugs = [
    { id: 14, name: 'Abacarvir' },
    { id: 163, name: 'Acenocoumarol' },
    { id: 33, name: 'Allopurinol' },
    { id: 27, name: 'Amitriptyline' },
    { id: 100, name: 'Aripiprazole' },
    { id: 65, name: 'Aspirin' },
    { id: 46, name: 'atazanavir' },
  ];
  listOfGenes = [
    { id: 98, name: 'ABCB1' },
    { id: 4, name: 'CACNA1S' },
    { id: 75, name: 'CFTR' },
    { id: 3, name: 'CYP2B6' },
    { id: 1, name: 'CYP2C19' },
    { id: 50, name: 'CYP2C9' },
    { id: 21, name: 'CYP2D6' },
  ];
  isSearch = false;
  searchKeyword: string | null;
  finalResults: Array<SearchResponse> | null;
  genericResults: Array<SearchResponse> | null;
  result: SearchResponse | null;
  drugId: number;
  geneCount: number;
  drugCount: number;
  brandCount: number;
  isDrug: boolean;
  isGene: boolean;
  isBrand: boolean;

  // paging variables
  searchCount: number = 0;
  searchTotal: number = 0;
  pageIndex: number = 0;
  pageSize: number = 20;
  previousCount: number = 0;

  length: number = 0;
  displayedColumns: string[] = ['name', 'type'];
  dataSource: MatTableDataSource<SearchResponse> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private pageLoadingService: PageLoadingService,
    private formBuilder: FormBuilder,
    private browserService: BrowserService,
    private translateService: TranslateService,
    private matSnackbarService: MatSnackbarService
  ) {
    this.dataSource = new MatTableDataSource(this.finalResults);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  change(event: PageEvent) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.length) {
      endIndex = this.length;
    }
    this.finalResults = this.finalResults.slice(startIndex, endIndex);
  }

  search(): void {
    this.searchForm.markAllAsTouched();
    if (this.searchForm.valid) {
      const formValue = this.searchForm.value;
      const keyword = formValue.keyword;
      this.searchKeyword = keyword;

      const searchRequest: SearchRequest = {
        keyword: formValue.keyword,
      };
      this.pageLoadingService.startLoading();

      this.browserService
        .search(searchRequest)
        .pipe(
          finalize(() => {
            this.pageLoadingService.stopLoading();
          })
        )
        .subscribe({
          next: (response: SpmedResponse<SearchResponse>) => {
            const searchResponse: SearchResponse = response?.data?.items[0];
            if (searchResponse == null) {
              const message = this.translateService.instant(
                'PDSS__BROWSER__RESULT__NOT__FOUND'
              );
              const action = this.translateService.instant(
                'MAT_SNACKBAR__ACTION__BROWSER'
              );
              this.matSnackbarService.open(message, action);
            } else {
              // this.paginator.length = response.data?.items.length;
              this.searchTotal = response.data?.items.length;
              this.onGetResults(response.data.items);
            }
          },
          complete: () => {
            console.log('this.browserService.search done!!!');
            this.isSearch = true;
          },
          error: (error) => {
            console.error(error.response);
            const message2 = this.translateService.instant(
              'PDSS__BROWSER__SERVER__NOT__RESPONSE'
            );
            const action2 = this.translateService.instant(
              'MAT_SNACKBAR__ACTION__BROWSER'
            );
            this.matSnackbarService.open(message2, action2);
          },
        });
    }
  }

  onGetResults(results: SearchResponse[]): void {
    const tempResults: SearchResponse[] = [];
    for (let element of results) {
      if (element.type == 'Brand') {
        var generic = results.find(function (el) {
          return el.id === element.id && el.type === 'Generic_Name';
        });
        var name = element.name + ' / ' + generic.name;
        element.name = name;
      }
      tempResults.push(element);
    }
    this.brandCount = results.filter((el) => el.type === 'Brand').length;
    if (this.brandCount > 0) {
      this.isBrand = true;
    } else {
      this.isBrand = false;
    }
    this.drugCount = results.filter((el) => el.type === 'Generic_Name').length;
    if (this.drugCount > 0) {
      this.isDrug = true;
    } else {
      this.isDrug = false;
    }
    this.geneCount = results.filter((el) => el.type === 'gene').length;
    if (this.geneCount > 0) {
      this.isGene = true;
    } else {
      this.isGene = false;
    }

    this.filterForm.patchValue({
      isBrand: this.isBrand,
      isDrug: this.isDrug,
      isGene: this.isGene,
    });

    this.finalResults = tempResults;
    this.dataSource.data = tempResults;
  }

  onChange($event: Event) {
    const tempResults: SearchResponse[] = [];
    this.filterForm.markAllAsTouched();
    if (this.filterForm.valid) {
      const formValue = this.filterForm.value;
      const isDrug = formValue.isDrug;
      const isGene = formValue.isGene;
      const isBrand = formValue.isBrand;

      for (let element of this.finalResults) {
        if (element.type == 'Brand') {
          if (isBrand == true) {
            tempResults.push(element);
          }
        } else if (element.type == 'Generic_Name') {
          if (isDrug == true) {
            tempResults.push(element);
          }
        } else if (element.type == 'gene') {
          if (isGene == true) {
            tempResults.push(element);
          }
        }
      }
      this.dataSource.data = tempResults;
      // console.log(this.finalResults);
    }
  }
}
