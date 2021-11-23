import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Demographic } from 'src/app/user/services/user-profile.service';

@Component({
  selector: 'app-basic-information-detail',
  templateUrl: './basic-information-detail.component.html',
  styleUrls: ['./basic-information-detail.component.scss'],
})
export class BasicInformationDetailComponent implements OnInit, OnDestroy {
  @Input() demographic$ = new BehaviorSubject<Demographic>(null);

  birthday: Date = null;
  weight: number = null;
  height: number = null;
  date: string = null;
  bmi: string = null;

  subscription$ = new Subscription();

  subscribeDemographicChange(): void {
    const sub = this.demographic$.subscribe((demographic) => {
      console.log(demographic);

      this.birthday = demographic?.birthday
        ? new Date(demographic.birthday)
        : null;
      const weightHeightHistoryList = demographic?.weightHeightHistories || [];

      const weightHeightHistorySortedList = weightHeightHistoryList.sort(
        (a, b) => Date.parse(b.date) - Date.parse(a.date)
      );
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
    });
    this.subscription$.add(sub);
  }
  constructor() {}

  ngOnInit(): void {
    this.subscribeDemographicChange();
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
