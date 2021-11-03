import { TestBed } from '@angular/core/testing';

import { PdssReportService } from './pdss-report.service';

describe('PdssReportService', () => {
  let service: PdssReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdssReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
