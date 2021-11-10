import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PageLoadingService } from '@shared/services/page-loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-loading',
  templateUrl: './page-loading.component.html',
  styleUrls: ['./page-loading.component.scss'],
})
export class PageLoadingComponent implements OnInit, OnDestroy, AfterViewInit {
  subscription$ = new Subscription();
  constructor(
    private pageLoadingService: PageLoadingService,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.style.display = 'none';
    const sub = this.pageLoadingService.isLoading$
      .pipe()
      .subscribe((status: boolean) => {
        this.elementRef.nativeElement.style.display = status ? 'block' : 'none';
        this.changeDetectorRef.detectChanges();
      });

    this.subscription$.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
