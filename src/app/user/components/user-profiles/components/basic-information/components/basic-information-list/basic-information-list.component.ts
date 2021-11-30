import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DateUtilService } from '@shared/services/date-util.service';
import { WeightHeightHistory } from '@user/services/user-profile.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-basic-information-list',
  templateUrl: './basic-information-list.component.html',
  styleUrls: ['./basic-information-list.component.scss'],
})
export class BasicInformationListComponent implements OnInit, OnDestroy {
  @Input() weightHeightHistoryList$ = new BehaviorSubject<
    WeightHeightHistory[]
  >(null);

  @Output() cancelEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter<number>();

  weightHeightHistoryList: WeightHeightHistory[] = null;

  subscription$ = new Subscription();

  constructor(private dateUtilService: DateUtilService) {}

  subscribeWeightHeightHistoryListChange(): void {
    const sub = this.weightHeightHistoryList$
      .pipe(distinctUntilChanged())
      .subscribe((weightHeightHistoryList) => {
        if (!!!weightHeightHistoryList) {
          return;
        }
        this.weightHeightHistoryList = weightHeightHistoryList?.sort(
          (a, b) => Date.parse(b.createdTime) - Date.parse(a.createdTime)
        );
      });
    this.subscription$.add(sub);
  }

  ngOnInit(): void {
    this.subscribeWeightHeightHistoryListChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  deleteItemClick(id: number): void {
    this.deleteEvent.emit(id);
  }

  cancelClick(): void {
    this.cancelEvent.emit();
  }
}
