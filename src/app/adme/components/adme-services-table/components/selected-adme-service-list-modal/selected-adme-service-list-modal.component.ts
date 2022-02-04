import { AdmeService } from '@adme/services/adme-service-data.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AdmeServiceRow } from '../../adme-services-table.component';

@Component({
  selector: 'app-selected-adme-service-list-modal',
  templateUrl: './selected-adme-service-list-modal.component.html',
  styleUrls: ['./selected-adme-service-list-modal.component.scss'],
  animations: [
    trigger('overlayOpenClose', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translate3d(0, 30%, 0)' }),
        animate(
          '200ms ease-in',
          style({ opacity: 1, transform: 'translate3d(0, 0, 0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translate3d(0, 0, 0)' }),
        animate(
          '200ms ease-out',
          style({ opacity: 0, transform: 'translate3d(0, 30%, 0)' })
        ),
      ]),
    ]),
    trigger('listOpenClose', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('200ms ease-in-out', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in-out', style({ opacity: 0, height: 0 })),
      ]),
    ]),
    trigger('listItemOpenClose', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10%)' }),
        animate(
          '200ms ease-in-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translate3d(0, 0, 0)' }),
        animate(
          '200ms ease-in-out',
          style({ opacity: 0, transform: 'translateY(-10%)' })
        ),
      ]),
    ]),
  ],
})
export class SelectedAdmeServiceListModalComponent {
  @Input() serviceList$: BehaviorSubject<AdmeServiceRow[]>;

  showAll: boolean = false;
  selectedList: AdmeService[] = [];
  subscriptions = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.subscribeServiceList$();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  subscribeServiceList$(): void {
    if (!this.serviceList$) {
      return;
    }
    this.subscriptions.add(
      this.serviceList$.subscribe(() => {
        this.reloadServiceList();
      })
    );
  }

  reloadServiceList(): void {
    const serviceList = this.serviceList$.getValue();
    this.selectedList = serviceList
      ?.filter((service) => service.selected)
      ?.map((row) => ({
        id: row.id,
        title: row.technology.value,
      }));
  }
}
