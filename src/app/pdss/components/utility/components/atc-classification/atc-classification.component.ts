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
  selector: 'app-atc-classification',
  templateUrl: './atc-classification.component.html',
  styleUrls: ['./atc-classification.component.scss'],
})
export class AtcClassificationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
