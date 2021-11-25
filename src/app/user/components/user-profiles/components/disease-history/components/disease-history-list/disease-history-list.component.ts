import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { DiseaseHistoryPutRequest } from '@user/services/user-disease-history.service';
import { DiseaseHistory } from '@user/services/user-profile.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-disease-history-list',
  templateUrl: './disease-history-list.component.html',
  styleUrls: ['./disease-history-list.component.scss'],
})
export class DiseaseHistoryListComponent implements OnInit, OnDestroy {
  @Input() diseaseHistoryList$ = new BehaviorSubject<DiseaseHistory[]>([]);
  @Input() mode$ = new BehaviorSubject<'VIEW' | 'EDIT'>(null);
  @Input() showLess$ = new BehaviorSubject<boolean>(null);

  @Output() showLessEvent = new EventEmitter<{ showLess: boolean }>();
  @Output() cancelEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() updateEvent = new EventEmitter<{
    diseaseHistoryId: number;
    putRequest: DiseaseHistoryPutRequest;
  }>();

  dataSource: DiseaseHistory[] = [];
  diseaseHistoryEditIdSet = new Set();

  subscription$ = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.subscribeDiseaseHistoryListChange();
    this.subscribeShowLessChange();
    this.subscribeModeChange();
  }

  isEditItem(diseaseHistoryId: number): boolean {
    return this.diseaseHistoryEditIdSet.has(diseaseHistoryId);
  }

  toggleEdit(diseaseHistoryId: number): void {
    if (!diseaseHistoryId) {
      return;
    }

    const mSet = new Set(this.diseaseHistoryEditIdSet);
    if (this.diseaseHistoryEditIdSet.has(diseaseHistoryId)) {
      // existed => remove
      mSet.delete(diseaseHistoryId);
    } else {
      mSet.add(diseaseHistoryId);
      // not existed => add
    }
    this.diseaseHistoryEditIdSet = mSet;
  }

  updateItem({
    diseaseHistoryId,
    putRequest,
  }: {
    diseaseHistoryId: number;
    putRequest: DiseaseHistoryPutRequest;
  }): void {
    if (!diseaseHistoryId) {
      return;
    }
    this.updateEvent.emit({ diseaseHistoryId, putRequest });
  }

  deleteItem(diseaseHistoryId: number): void {
    if (!diseaseHistoryId) {
      return;
    }
    this.deleteEvent.emit(diseaseHistoryId);
  }

  reloadDataSource(): void {
    const showLess = this.showLess$.value;
    const diseaseHistoryList = this.diseaseHistoryList$.value;
    const mode = this.mode$.value;
    if (
      mode === 'VIEW' &&
      diseaseHistoryList &&
      diseaseHistoryList.length > 0 &&
      showLess
    ) {
      this.dataSource = diseaseHistoryList.slice(0, 3);
    } else {
      this.dataSource = diseaseHistoryList;
    }
  }

  subscribeShowLessChange(): void {
    const sub = this.showLess$.pipe(distinctUntilChanged()).subscribe(() => {
      this.reloadDataSource();
    });
    this.subscription$.add(sub);
  }
  subscribeDiseaseHistoryListChange(): void {
    const sub = this.diseaseHistoryList$
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.reloadDataSource();
      });

    this.subscription$.add(sub);
  }

  subscribeModeChange(): void {
    const sub = this.mode$.pipe(distinctUntilChanged()).subscribe(() => {
      this.reloadDataSource();
    });
    this.subscription$.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
  cancelClick(): void {
    this.cancelEvent.emit();
  }
}
