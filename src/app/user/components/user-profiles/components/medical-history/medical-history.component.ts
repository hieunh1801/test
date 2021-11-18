import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { MedicalHistory } from 'src/app/user/services/user-profile.service';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss'],
})
export class MedicalHistoryComponent implements OnInit, OnDestroy {
  @Input() medicalHistoryList$ = new BehaviorSubject<MedicalHistory[]>([]);

  medicalHistoryList: MedicalHistory[] = [];
  subscription$ = new Subscription();

  MedicalHistoryMode = MedicalHistoryMode;
  mode: MedicalHistoryMode = MedicalHistoryMode.VIEW;

  constructor() {}

  subscribeMedicalHistoryListChange(): void {
    const sub = this.medicalHistoryList$
      .pipe(distinctUntilChanged())
      .subscribe((data) => {
        console.log(data);
        this.medicalHistoryList = data;
      });
    this.subscription$.add(sub);
  }

  ngOnInit(): void {
    this.subscribeMedicalHistoryListChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}

enum MedicalHistoryMode {
  VIEW = 'VIEW',
  ADD = 'add',
  EDIT = 'edit',
  GRAPH = 'graph',
}
