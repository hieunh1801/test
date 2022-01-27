import { AdmeService } from '@adme/services/adme-service-data.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

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
  ],
})
export class SelectedAdmeServiceListModalComponent
  implements OnInit, OnDestroy
{
  @Input() selectedServiceList$: BehaviorSubject<AdmeService[]>;

  showAll: boolean = false;
  serviceList: AdmeService[] = [];
  subscriptions = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.subscribeSelectedServiceList$();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  subscribeSelectedServiceList$(): void {
    this.subscriptions.add(
      this.selectedServiceList$.subscribe(() => {
        this.reloadServiceList();
      })
    );
  }

  reloadServiceList(): void {
    const serviceList = this.selectedServiceList$.getValue();
    this.serviceList = serviceList;
  }
}
