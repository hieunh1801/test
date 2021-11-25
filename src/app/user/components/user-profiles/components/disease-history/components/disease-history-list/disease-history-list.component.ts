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
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  ConfirmDialogComponent,
  ConfirmDialogInput,
  ConfirmDialogOutput,
} from '@shared/components/confirm-dialog/confirm-dialog.component';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import {
  DiseaseHistoryPutRequest,
  UserDiseaseHistoryService,
} from '@user/services/user-disease-history.service';
import { DiseaseHistory } from '@user/services/user-profile.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-disease-history-list',
  templateUrl: './disease-history-list.component.html',
  styleUrls: ['./disease-history-list.component.scss'],
})
export class DiseaseHistoryListComponent
  implements OnInit, OnDestroy, OnChanges
{
  @Input() diseaseHistoryList$ = new BehaviorSubject<DiseaseHistory[]>([]);
  @Input() mode: 'VIEW' | 'EDIT' = 'VIEW';

  @Output() cancelEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() updateEvent = new EventEmitter<{
    diseaseHistoryId: number;
    putRequest: DiseaseHistoryPutRequest;
  }>();

  dataSource: DiseaseHistory[] = [];
  diseaseHistoryEditIdSet = new Set();

  subscription$ = new Subscription();
  showLess$ = new BehaviorSubject<boolean>(true);

  constructor() {}

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
    if (this.mode === 'VIEW') {
      if (diseaseHistoryList && diseaseHistoryList.length > 0) {
        if (showLess) {
          this.dataSource = diseaseHistoryList.slice(0, 3);
        } else {
          this.dataSource = diseaseHistoryList;
        }
      }
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
  ngOnInit(): void {
    this.subscribeDiseaseHistoryListChange();
    this.subscribeShowLessChange();
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const modeSimpleChange: SimpleChange = simpleChanges.mode;
    if (
      modeSimpleChange &&
      modeSimpleChange.currentValue !== modeSimpleChange.previousValue
    ) {
      this.reloadDataSource();
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
  cancelClick(): void {
    this.cancelEvent.emit();
  }
}
