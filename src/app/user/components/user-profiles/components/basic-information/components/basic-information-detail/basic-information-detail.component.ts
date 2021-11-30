import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BmiCalculatorService } from '@shared/services/bmi-calculator.service';
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
  bmi: number = null;

  subscription$ = new Subscription();

  constructor(private bmiCalculator: BmiCalculatorService) {}

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
          this.weight = null;
          this.height = null;
          this.date = null;
          this.bmi = null;
          this.weightHeightHistoryList = null;
          return;
        }

        let weightHeightHistorySortedList = weightHeightHistoryList
          .sort((a, b) => Date.parse(b.createdTime) - Date.parse(a.createdTime))
          .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

        this.weightHeightHistoryList = weightHeightHistorySortedList;

        const latestVersion = weightHeightHistorySortedList?.[0] || null;
        if (latestVersion) {
          const { weight, height, date } = latestVersion;
          this.weight = weight;
          this.height = height;
          this.date = date;

          this.bmi = this.bmiCalculator.calculateBmi(weight, height);
        }
      }
    );
    this.subscription$.add(sub);
  }
}
