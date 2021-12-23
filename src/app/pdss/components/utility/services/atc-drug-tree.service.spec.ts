import { TestBed } from '@angular/core/testing';

import { AtcDrugTreeService } from './atc-drug-tree.service';

describe('AtcDrugTreeService', () => {
  let service: AtcDrugTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtcDrugTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
