import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { LifeStyleHistory } from '@user/services/user-profile.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-life-style-list',
  templateUrl: './life-style-list.component.html',
  styleUrls: ['./life-style-list.component.scss'],
})
export class LifeStyleListComponent implements OnInit, OnDestroy {
  @Input() lifeStyleHistoryList$ = new BehaviorSubject<LifeStyleHistory[]>(
    null
  );

  @Output() cancelEvent = new EventEmitter();
  @Output() deleteItemEvent = new EventEmitter<number>();

  lifeStyleHistoryList: LifeStyleHistory[] = null;

  subscription$ = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.subscribeLifeStyleHistoryListChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  subscribeLifeStyleHistoryListChange(): void {
    const sub = this.lifeStyleHistoryList$.subscribe((lifeStyleHistory) => {
      this.lifeStyleHistoryList = lifeStyleHistory
        ? lifeStyleHistory.sort(
            (a, b) => Date.parse(b.date) - Date.parse(a.date)
          )
        : [];
    });
    this.subscription$.add(sub);
  }

  cancelClick(): void {
    this.cancelEvent.emit();
  }

  deleteItemClick(id: number): void {
    this.deleteItemEvent.emit(id);
  }
}
