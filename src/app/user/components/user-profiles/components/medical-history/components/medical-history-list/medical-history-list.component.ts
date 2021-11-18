import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MedicalHistory } from 'src/app/user/services/user-profile.service';

@Component({
  selector: 'app-medical-history-list',
  templateUrl: './medical-history-list.component.html',
  styleUrls: ['./medical-history-list.component.scss'],
})
export class MedicalHistoryListComponent implements OnInit, OnDestroy {
  @Input() medicalHistoryList$ = new BehaviorSubject<MedicalHistory[]>([]);
  @Input() dataSource: MedicalHistory[] = [];

  showLess$ = new BehaviorSubject<boolean>(true);
  subscription$ = new Subscription();

  constructor() {}

  reloadDataSource(): void {
    const medicalHistoryList = this.medicalHistoryList$.value;
    const showLess = this.showLess$.value;
    if (medicalHistoryList && medicalHistoryList.length > 0) {
      if (showLess) {
        this.dataSource = medicalHistoryList.slice(0, 3);
      } else {
        this.dataSource = medicalHistoryList;
      }
    }
  }

  subscribeMedicalHistoryListChange(): void {
    const sub = this.medicalHistoryList$.subscribe(() => {
      this.reloadDataSource();
    });
    this.subscription$.add(sub);
  }

  subscribeShowLessChange(): void {
    const sub = this.showLess$.subscribe(() => {
      this.reloadDataSource();
    });
    this.subscription$.add(sub);
  }

  ngOnInit(): void {
    this.subscribeShowLessChange();
    this.subscribeMedicalHistoryListChange();
  }

  ngOnDestroy(): void {
    console.log('DESTROY');
    this.subscription$.unsubscribe();
  }
}
