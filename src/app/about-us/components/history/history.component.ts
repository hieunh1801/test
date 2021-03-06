import {
  CompanyHistory,
  CompanyHistoryDataService,
} from '@about-us/services/company-history-data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@shared/services/language.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  companyHistoryList$ = new BehaviorSubject<CompanyHistory[]>(null);
  timeline: History[] = null;

  subscriptions$ = new Subscription();
  constructor(
    private languageService: LanguageService,
    private companyHistoryDataService: CompanyHistoryDataService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.subscribeCompanyHistoryList$();
    this.subscribeLanguageChange();

    this.loadCompanyHistoryList$();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  subscribeCompanyHistoryList$(): void {
    this.subscriptions$.add(
      this.companyHistoryList$.subscribe((companyHistoryList) => {
        this.reloadTimeLine();
      })
    );
  }

  subscribeLanguageChange(): void {
    this.subscriptions$.add(
      this.translateService.onLangChange.subscribe(() => {
        this.reloadTimeLine();
      })
    );
  }

  loadCompanyHistoryList$(): void {
    this.companyHistoryDataService
      .getAllCompanyHistory()
      .pipe(retry(3))
      .subscribe((response) => {
        const data = response?.data?.items || null;
        this.companyHistoryList$.next(data);
      });
  }

  reloadTimeLine(): void {
    let companyHistoryList = this.companyHistoryList$.getValue();
    const language = this.languageService.currentLanguage;
    // check null
    if (companyHistoryList == null) {
      this.timeline = null;
      return;
    }

    // select language
    if (language !== 'en') {
      companyHistoryList = companyHistoryList?.map((item) => {
        return { ...item, ...item[language] };
      });
    }

    const historyMap = new Map<string, History>();
    const linkSymbol = '#';

    for (const companyHistory of companyHistoryList) {
      const normalizedYear = companyHistory.year.toString();
      const normalizedMonth =
        companyHistory.month?.length === 1
          ? `0${companyHistory.month}`
          : companyHistory.month;
      const time = [normalizedYear, normalizedMonth].join(linkSymbol);

      const history = historyMap.get(time);
      if (history == null) {
        historyMap.set(time, {
          year: normalizedYear,
          month: normalizedMonth,
          events: [companyHistory.achieve],
        });
      } else {
        history.events.push(companyHistory.achieve);
      }
    }

    const historyMapSorted = new Map(
      [...historyMap.entries()].sort().reverse()
    );

    // get timeline value
    const timeline = Array.from(historyMapSorted.values());

    this.timeline = timeline;
  }
}

interface History {
  year: string;
  month: string;
  events: string[];
}
