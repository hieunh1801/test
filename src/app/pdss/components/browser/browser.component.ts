import { Component, OnDestroy, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss'],
})
export class BrowserComponent implements OnInit, OnDestroy {
  searchForm = this.formBuilder.group({
    keyword: ['', Validators.required],
  });

  subscription$ = new Subscription();

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
  finalResults: Array<SearchResponse> | null;
  genericResults: Array<SearchResponse> | null;
  result: SearchResponse | null;
  drugId: number;

  constructor(
    private pageLoadingService: PageLoadingService,
    private formBuilder: FormBuilder,
    private browserService: BrowserService,
    private translateService: TranslateService,
    private matSnackbarService: MatSnackbarService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  search(): void {
    this.searchForm.markAllAsTouched();
    if (this.searchForm.valid) {
      const formValue = this.searchForm.value;
      const keyword = formValue.keyword;

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
    this.finalResults = results;
  }

  onGetGenericName({
    drugId,
    results,
  }: {
    drugId: number;
    results: SearchResponse[];
  }) {
    const fiilterName = results.filter((result) => result.id == drugId);
    console.log(fiilterName);
    return fiilterName;
  }
}
