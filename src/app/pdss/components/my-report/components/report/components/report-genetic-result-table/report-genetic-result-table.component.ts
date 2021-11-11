import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import {
  PdssReportService,
  UserVariant,
} from '@pdss/components/my-report/services/pdss-report.service';
import {
  LanguageService,
  LanguagesProvidedType,
} from '@shared/services/language.service';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { TableHelperService } from '@shared/services/table-helper.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-report-genetic-result-table',
  templateUrl: './report-genetic-result-table.component.html',
  styleUrls: ['./report-genetic-result-table.component.scss'],
})
export class ReportGeneticResultTableComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() qrCode: string;
  tableData$ = new BehaviorSubject<UserVariant[]>([]);
  tableSort$ = new BehaviorSubject<Sort>(null);
  tableDataSorted: UserVariant[] = [];
  tableColumnList: string[] = [
    'geneSymbol',
    'relatedTestAlleles',
    'variantGenotype',
    'variantPhenotype',
    'variantPhenotypeSummary',
    'relatedDrugs',
  ];

  subscription$ = new Subscription();

  constructor(
    private pdssReportService: PdssReportService,
    private matSnackbarService: MatSnackbarService,
    private translateService: TranslateService,
    private languageService: LanguageService,
    private tableHelperService: TableHelperService
  ) {}

  reloadTable(): void {
    const tableSort: Sort = this.tableSort$.value || null;
    const language: string = this.languageService.currentLanguage;

    let tableData: UserVariant[] = this.tableData$.value || [];

    // multiple language
    if (language === LanguagesProvidedType.korea) {
      tableData = tableData.map((userVariant) => ({
        ...userVariant,
        ...userVariant?.kr,
      }));
    }
    let mTableDataSorted = [];
    const compare = this.tableHelperService.compare;
    if (tableSort && tableSort.active && tableSort.direction !== '') {
      mTableDataSorted = tableData.sort((a, b) => {
        const isAsc = tableSort.direction === 'asc';
        switch (tableSort.active) {
          case 'geneSymbol':
            return compare(a.userGeneSymbol, b.userGeneSymbol, isAsc);
          case 'relatedTestAlleles':
            return compare(a.relatedTestAlleles, b.relatedTestAlleles, isAsc);
          case 'variantGenotype':
            const value1 =
              this.renderRsid(a.variantRsid) + ' ' + a.variantGenotype;
            const value2 =
              this.renderRsid(b.variantRsid) + ' ' + b.variantGenotype;
            return compare(value1, value2, isAsc);
          case 'variantPhenotype':
            return compare(a.variantPhenotype, b.variantPhenotype, isAsc);
          case 'variantPhenotypeSummary':
            return compare(
              a.variantPhenotypeSummary,
              b.variantPhenotypeSummary,
              isAsc
            );
          case 'relatedDrugs':
            return compare(a.relatedDrugs, b.relatedDrugs, isAsc);
          default:
            return 0;
        }
      });
    } else {
      mTableDataSorted = tableData;
    }

    this.tableDataSorted = [...mTableDataSorted];
  }

  loadUserVariant(qrCode: string): void {
    if (!qrCode) {
      qrCode = this.qrCode;
    }

    if (qrCode) {
      this.pdssReportService.getReportGeneticResult(qrCode).subscribe({
        next: (response) => {
          this.tableData$.next(response?.data?.items || []);
        },
        error: (error) => {
          console.error(error);
          this.matSnackbarService.open('Load genetic result error', 'GET');
        },
      });
    }
  }

  subscribeTableDataChange(): void {
    const sub = this.tableData$.asObservable().subscribe(() => {
      this.reloadTable();
    });
    this.subscription$.add(sub);
  }
  subscribeLanguageChange(): void {
    const sub = this.translateService.onLangChange.subscribe(() => {
      this.reloadTable();
    });
    this.subscription$.add(sub);
  }

  subscribeTableSortChange(): void {
    const sub = this.tableSort$.asObservable().subscribe(() => {
      this.reloadTable();
    });
    this.subscription$.add(sub);
  }

  ngOnInit(): void {
    this.subscribeLanguageChange();
    this.subscribeTableDataChange();
    this.subscribeTableSortChange();
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const qrCodeSimpleChange = simpleChanges?.qrCode;
    if (qrCodeSimpleChange) {
      const cur = qrCodeSimpleChange.currentValue;
      const pre = qrCodeSimpleChange.previousValue;
      if (cur !== pre) {
        this.loadUserVariant(cur);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  matSortChange(sort: Sort): void {
    this.tableSort$.next(sort);
  }

  renderRsid(rsid?: string): string {
    if (rsid && !rsid.startsWith('*')) {
      return rsid;
    }
    return null;
  }
}
