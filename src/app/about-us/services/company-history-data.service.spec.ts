import { TestBed } from '@angular/core/testing';

import { CompanyHistoryDataService } from './company-history-data.service';

describe('CompanyHistoryDataService', () => {
  let service: CompanyHistoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyHistoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
