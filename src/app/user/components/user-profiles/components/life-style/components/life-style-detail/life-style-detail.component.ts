import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LifeStyleHistory } from '@user/services/user-profile.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-life-style-detail',
  templateUrl: './life-style-detail.component.html',
  styleUrls: ['./life-style-detail.component.scss'],
})
export class LifeStyleDetailComponent implements OnInit, OnDestroy {
  @Input() lifeStyleHistoryList$ = new BehaviorSubject<LifeStyleHistory[]>(
    null
  );

  subscription$ = new Subscription();
  lifeStyleHistoryList: LifeStyleHistory[] = null;
  alcohol: number = null;
  alcoholAmount: number = null;
  alcoholUnit: string = null;
  alcoholPerTimeUnit: string = null;
  coffee: number = null;
  coffeeAmount: number = null;
  coffeeUnit: string = null;
  coffeePerTimeUnit: string = null;
  smoking: number = null;
  smokingAmount: number = null;
  smokingUnit: string = null;
  smokingPerTimeUnit: string = null;
  date: string = null;

  constructor() {}

  ngOnInit(): void {
    this.subscribeLifeStyleHistoryListChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  subscribeLifeStyleHistoryListChange(): void {
    const sub = this.lifeStyleHistoryList$.subscribe((lifeStyleHistoryList) => {
      if (!!!lifeStyleHistoryList) {
        this.lifeStyleHistoryList = null;
        this.alcohol = null;
        this.alcoholAmount = null;
        this.alcoholUnit = null;
        this.alcoholPerTimeUnit = null;
        this.coffee = null;
        this.coffeeAmount = null;
        this.coffeeUnit = null;
        this.coffeePerTimeUnit = null;
        this.smoking = null;
        this.smokingAmount = null;
        this.smokingUnit = null;
        this.smokingPerTimeUnit = null;
        this.date = null;
        return;
      }

      const sortedList = lifeStyleHistoryList.sort(
        (a, b) => Date.parse(b.date) - Date.parse(a.date)
      );

      this.lifeStyleHistoryList = sortedList;
      const latestVersion = sortedList?.[0] || null;
      this.alcohol = latestVersion?.alcohol;
      this.alcoholAmount = latestVersion?.alcoholAmount;
      this.alcoholUnit = latestVersion?.alcoholUnit;
      this.alcoholPerTimeUnit = latestVersion?.alcoholPerTimeUnit;
      this.coffee = latestVersion?.coffee;
      this.coffeeAmount = latestVersion?.coffeeAmount;
      this.coffeeUnit = latestVersion?.coffeeUnit;
      this.coffeePerTimeUnit = latestVersion?.coffeePerTimeUnit;
      this.smoking = latestVersion?.smoking;
      this.smokingAmount = latestVersion?.smokingAmount;
      this.smokingUnit = latestVersion?.smokingUnit;
      this.smokingPerTimeUnit = latestVersion?.smokingPerTimeUnit;
      this.date = latestVersion?.date;
    });
    this.subscription$.add(sub);
  }
}
