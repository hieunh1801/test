import { TestBed } from '@angular/core/testing';

import { AtcDrugTreeDataSourceService } from './atc-drug-tree-data-source.service';

describe('AtcDrugTreeDataSourceService', () => {
  let service: AtcDrugTreeDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtcDrugTreeDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
