import { Component, OnInit } from '@angular/core';
import { AtcCode } from '@pdss/components/browser/components/drug/atc-code';
import { Drug } from '@pdss/components/browser/components/drug/drug';
import { PageLoadingService } from '@shared/services/page-loading.service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PdssAtcCodeService } from '../../services/pdss-atc-code.service';
import {
  AtcDrugSearchRequest,
  PdssDrugService,
} from '../../services/pdss-drug.service';

@Component({
  selector: 'app-atc-classification-v2',
  templateUrl: './atc-classification-v2.component.html',
  styleUrls: ['./atc-classification-v2.component.scss'],
})
export class AtcClassificationV2Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
