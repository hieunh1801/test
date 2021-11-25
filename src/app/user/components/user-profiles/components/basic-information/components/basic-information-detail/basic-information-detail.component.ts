import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WeightHeightHistory } from '@user/services/user-profile.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-basic-information-detail',
  templateUrl: './basic-information-detail.component.html',
  styleUrls: ['./basic-information-detail.component.scss'],
})
export class BasicInformationDetailComponent implements OnInit, OnDestroy {
  @Input() weightHeightHistoryList$ = new BehaviorSubject<
    WeightHeightHistory[]
  >(null);

  weightHeightHistoryList: WeightHeightHistory[] = null;
  weight: number = null;
  height: number = null;
  date: string = null;
  bmi: string = null;

  subscription$ = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.subscribeWeightHeightListChange();
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  subscribeWeightHeightListChange(): void {
    const sub = this.weightHeightHistoryList$.subscribe(
      (weightHeightHistoryList) => {
        if (!!!weightHeightHistoryList) {
          return;
        }

        const weightHeightHistorySortedList = weightHeightHistoryList.sort(
          (a, b) => Date.parse(b.date) - Date.parse(a.date)
        );

        this.weightHeightHistoryList = weightHeightHistorySortedList;

        const latestVersion = weightHeightHistorySortedList?.[0] || null;
        if (latestVersion) {
          const { weight, height, date } = latestVersion;
          this.weight = weight;
          this.height = height;
          this.date = date;

          this.bmi =
            weight && height && weight > 0 && height > 0
              ? (weight / (height * height)).toFixed(2)
              : null;
        }
      }
    );
    this.subscription$.add(sub);
  }
}
