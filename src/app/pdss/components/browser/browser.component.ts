import {
  Component,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { PageLoadingService } from '@shared/services/page-loading.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged, finalize, first } from 'rxjs/operators';
import {
  BrowserService,
  SearchRequest,
  SearchResponse,
  TopDrugsResponse,
  TopGenesResponse,
} from './services/browser.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss'],
})
export class BrowserComponent implements OnInit, OnDestroy, AfterViewInit {
  searchForm = this.formBuilder.group({
    keyword: [''],
  });

  filterForm = this.formBuilder.group({
    isBrand: [''],
    isDrug: [''],
    isGene: [''],
  });

  loading: boolean = false;

  subscription$ = new Subscription();
  pageChangeSub$: Subscription;
  listOfDrugs: Array<TopDrugsResponse> | null;
  listOfGenes: Array<TopGenesResponse> | null;
  isSearch = false;
  searchKeyword: string | null;
  finalResults: Array<SearchResponse> | null;
  totalResults: Array<SearchResponse> | null;
  topDrugs: Array<TopDrugsResponse> | null;
  topGenes: Array<TopGenesResponse> | null;
  result: SearchResponse | null;
  drugId: number;
  geneCount: number;
  drugCount: number;
  brandCount: number;
  finalCount: number;
  isDrug: boolean;
  isGene: boolean;
  isBrand: boolean;
  keyword: string;

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
    private activatedRouter: ActivatedRoute,
    private router: Router,
    public pageLoadingService: PageLoadingService,
    private formBuilder: FormBuilder,
    private browserService: BrowserService,
    private matSnackbarService: MatSnackbarService,
    private translateService: TranslateService
  ) {
    this.dataSource = new MatTableDataSource(this.finalResults);
  }

  ngOnInit(): void {
    this.subscribeFilterFormChange();
    this.subscribeSearchFormChange();

    this.activatedRouter.queryParams
      .pipe(distinctUntilChanged())
      .subscribe((params) => {
        this.keyword = params.keyword;
        this.searchForm.patchValue({
          keyword: params?.keyword || '',
        });
        this.search();
      });

    // this.getTopDrugs();
    // this.getTopGenes();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  subscribeSearchFormChange(): void {
    const sub = this.searchForm.valueChanges.subscribe(() => {});
    this.subscription$.add(sub);
  }

  subscribeFilterFormChange(): void {
    const sub = this.filterForm.valueChanges.subscribe(() => {
      this.syncQueryParams();
    });
    this.subscription$.add(sub);
  }

  change(event: PageEvent) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    if (endIndex > this.length) {
      endIndex = this.length;
    }
    this.finalResults = this.finalResults.slice(startIndex, endIndex);
  }

  search(): void {
    this.searchForm.markAllAsTouched();
    if (this.searchForm.valid) {
      const formValue = this.searchForm.value;
      const keyword = formValue.keyword?.trim() || '';
      if (!keyword) {
        this.isSearch = false;
        this.searchKeyword = '';
        this.onGetResults([]);
        return;
      } else {
        this.isSearch = true;
      }
      const searchRequest: SearchRequest = {
        keyword: keyword,
      };

      this.loading = true;

      this.browserService
        .search(searchRequest)
        .pipe(
          finalize(() => {
            this.searchKeyword = keyword.trim();
            this.loading = false;
          })
        )
        .subscribe({
          next: (response: SpmedResponse<SearchResponse>) => {
            this.onGetResults(response?.data?.items || []);
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

  onGetResults(processResults: SearchResponse[]): void {
    const tempResults: SearchResponse[] = [];
    const results: SearchResponse[] = [];
    var lookupObject = {};

    // remove duplicate drug name
    const removeDuplicates = (array, key) => {
      return array.reduce((arr, item) => {
        const removed = arr.filter((i) => i[key] !== item[key]);
        return [...removed, item];
      }, []);
    };
    lookupObject = removeDuplicates(processResults, 'name');

    for (var i in lookupObject) {
      results.push(lookupObject[i]);
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

    const fcount = this.drugCount + this.brandCount;
    if (this.isBrand == true && this.isDrug == true) {
      this.finalCount = fcount - this.drugCount;
    } else {
      this.finalCount = fcount;
    }
    for (let element of results) {
      if (element.type == 'Brand') {
        var generic = results.find(function (el) {
          return el.id === element.id && el.type === 'Generic_Name';
        });
        var name = element.name + ' (' + generic.name + ')';
        element.name = name;
        tempResults.push(element);
      } else if (element.type == 'Generic_Name') {
        if (this.isBrand != true) {
          tempResults.push(element);
        }
      } else if (element.type == 'gene') {
        tempResults.push(element);
      }
    }

    this.filterForm.patchValue({
      isBrand: this.isBrand,
      isDrug: this.isDrug,
      isGene: this.isGene,
    });

    this.finalResults = tempResults;
    this.totalResults = tempResults;
    this.dataSource.data = tempResults;
    this.searchTotal = this.finalCount + this.geneCount;
  }

  onChange() {
    const tempResults: SearchResponse[] = [];
    this.filterForm.markAllAsTouched();
    if (this.filterForm.valid) {
      const formValue = this.filterForm.value;
      const isDrug = formValue.isDrug;
      const isGene = formValue.isGene;

      for (let element of this.totalResults) {
        if (element.type == 'Brand') {
          if (isDrug == true) {
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
    }
  }

  getTopDrugs() {
    this.pageLoadingService.startLoading();

    // get drugs data from api
    this.browserService
      .getTopDrugs()
      .pipe(
        finalize(() => {
          this.pageLoadingService.stopLoading();
        })
      )
      .subscribe({
        next: (response: SpmedResponse<TopDrugsResponse>) => {
          const topDrugsResponse: TopDrugsResponse = response?.data?.items[0];
          if (topDrugsResponse == null) {
            const message = this.translateService.instant(
              'PDSS__BROWSER__RESULT__NOT__FOUND'
            );
            const action = this.translateService.instant(
              'MAT_SNACKBAR__ACTION__BROWSER'
            );
            this.matSnackbarService.open(message, action);
          } else {
            // this.paginator.length = response.data?.items.length;
            // this.searchTotal = response.data?.items.length;
            this.onGetDrugs(response.data.items);
          }
        },
        complete: () => {},
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

  onGetDrugs(results: TopDrugsResponse[]): void {
    // this.topDrugs = results;
    this.listOfDrugs = results;
  }

  getTopGenes() {
    this.pageLoadingService.startLoading();

    // get drugs data from api
    this.browserService
      .getTopGenes()
      .pipe(
        finalize(() => {
          this.pageLoadingService.stopLoading();
        })
      )
      .subscribe({
        next: (response: SpmedResponse<TopGenesResponse>) => {
          const topGenesResponse: TopGenesResponse = response?.data?.items[0];
          if (topGenesResponse == null) {
            const message = this.translateService.instant(
              'PDSS__BROWSER__RESULT__NOT__FOUND'
            );
            const action = this.translateService.instant(
              'MAT_SNACKBAR__ACTION__BROWSER'
            );
            this.matSnackbarService.open(message, action);
          } else {
            // this.paginator.length = response.data?.items.length;
            // this.searchTotal = response.data?.items.length;
            this.onGetTopGenes(response.data.items);
          }
        },
        complete: () => {},
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

  onGetTopGenes(results: TopGenesResponse[]): void {
    // this.topGenes = results;
    this.listOfGenes = results;
  }

  syncQueryParams(): void {
    const searchFormValue = this.searchForm.value;
    // const filterFormValue = this.filterForm.value;
    const filterFormValue = null;

    this.router.navigate(['.'], {
      relativeTo: this.activatedRouter,
      queryParams: { ...searchFormValue, ...filterFormValue },
    });
  }
}
