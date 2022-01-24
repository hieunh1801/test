import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination-sync-with-query-param',
  templateUrl: './pagination-sync-with-query-param.component.html',
  styleUrls: ['./pagination-sync-with-query-param.component.scss'],
})
export class PaginationSyncWithQueryParamComponent
  implements OnInit, OnChanges
{
  @Input() total: number = 100;
  @Input() pageIndex: number = 1;
  @Input() pageSize: number = 10;

  pageNumbers = [];

  constructor() {}

  ngOnInit(): void {
    this.reloadPageNumbers(this.total, this.pageSize);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const total = changes?.total?.currentValue || 100;
    const pageIndex = changes?.pageIndex?.currentValue || 10;
    const pageSize = changes?.pageSize?.currentValue || 10;
    this.reloadPageNumbers(total, pageSize);
  }

  reloadPageNumbers(total: number = 100, pageSize: number = 10) {
    console.log(total, pageSize);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
      pageNumbers.push(i);
    }

    let reducedPageNumbers = [];
    if (pageNumbers.length > 6) {
      reducedPageNumbers.push(
        ...[
          pageNumbers[0],
          pageNumbers[1],
          pageNumbers[2],
          pageNumbers[3],
          '...',
          pageNumbers[pageNumbers.length - 2],
          pageNumbers[pageNumbers.length - 1],
        ]
      );
    } else {
      reducedPageNumbers = [...pageNumbers];
    }
    console.log('reduced', reducedPageNumbers);
    this.pageNumbers = reducedPageNumbers;
  }
}
