import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MedicalHistoryPutRequest } from '@user/services/user-medical-history.service';
import { MedicalHistory } from '@user/services/user-profile.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-medical-history-list',
  templateUrl: './medical-history-list.component.html',
  styleUrls: ['./medical-history-list.component.scss'],
})
export class MedicalHistoryListComponent implements OnInit, OnDestroy {
  @Input() medicalHistoryList$ = new BehaviorSubject<MedicalHistory[]>([]);
  @Input() mode$ = new BehaviorSubject<'VIEW' | 'EDIT'>(null);
  @Input() showLess$ = new BehaviorSubject<boolean>(null);

  @Output() showLessEvent = new EventEmitter<{ showLess: boolean }>();
  @Output() cancelEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter<{ medicalHistoryId: number }>();
  @Output() updateEvent = new EventEmitter<{
    medicalHistoryId: number;
    putRequest: MedicalHistoryPutRequest;
  }>();

  dataSource: MedicalHistory[] = [];
  medicalHistoryIdEditSet = new Set();

  subscription$ = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.subscribeMedicalHistoryListChange();
    this.subscribeModeChange();
    this.subscribeShowLessChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  reloadDataSource(): void {
    const medicalHistoryList = this.medicalHistoryList$.value;
    const mode = this.mode$.value;
    const showLess = this.showLess$.value;
    if (
      medicalHistoryList &&
      medicalHistoryList.length > 0 &&
      mode === 'VIEW' &&
      showLess
    ) {
      this.dataSource = medicalHistoryList.slice(0, 3);
    } else {
      this.dataSource = medicalHistoryList;
    }
  }

  subscribeMedicalHistoryListChange(): void {
    const sub = this.medicalHistoryList$.subscribe(() => {
      this.reloadDataSource();
    });
    this.subscription$.add(sub);
  }

  subscribeModeChange(): void {
    const sub = this.mode$.subscribe(() => {
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

  isEditItem(medicalHistoryId: number): boolean {
    return this.medicalHistoryIdEditSet.has(medicalHistoryId);
  }

  toggleEditItem(medicalHistoryId: number): void {
    if (!medicalHistoryId) {
      return;
    }

    const mSet = new Set(this.medicalHistoryIdEditSet);
    if (mSet.has(medicalHistoryId)) {
      mSet.delete(medicalHistoryId);
    } else {
      mSet.add(medicalHistoryId);
    }
    this.medicalHistoryIdEditSet = mSet;
  }

  updateItem({
    medicalHistoryId,
    putRequest,
  }: {
    medicalHistoryId: number;
    putRequest: MedicalHistoryPutRequest;
  }): void {
    if (!medicalHistoryId) {
      return;
    }

    this.updateEvent.emit({ medicalHistoryId, putRequest });
  }

  deleteItem(medicalHistoryId: number): void {
    if (!medicalHistoryId) {
      return;
    }
    this.deleteEvent.emit({ medicalHistoryId });
  }

  cancelClick(): void {
    this.cancelEvent.emit();
  }

  showLessClick(): void {
    this.showLessEvent.emit({
      showLess: true,
    });
  }
  showMoreClick(): void {
    this.showLessEvent.emit({
      showLess: false,
    });
  }
}
