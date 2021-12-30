import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserVariant } from '@pdss/components/my-report/services/pdss-report.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-genetic-profile',
  templateUrl: './genetic-profile.component.html',
  styleUrls: ['./genetic-profile.component.scss'],
})
export class GeneticProfileComponent implements OnInit, OnDestroy {
  @Input() userVariants$: BehaviorSubject<UserVariant[]>;
  userVariants: UserVariant[] = null;

  subscription$ = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.subscribeUserVariantsChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  subscribeUserVariantsChange(): void {
    const sub = this.userVariants$?.subscribe((userVariants) => {
      this.userVariants = userVariants;
    });
    this.subscription$.add(sub);
  }

  getGenotype(element: UserVariant): string {
    const { variantRsid, variantGenotypeCode } = element;
    if (!variantRsid) {
      return variantGenotypeCode;
    }
    if (variantRsid.startsWith('*')) {
      return variantGenotypeCode;
    }

    return variantRsid + ' ' + variantGenotypeCode;
  }
}
