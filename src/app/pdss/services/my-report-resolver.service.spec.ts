import { TestBed } from '@angular/core/testing';

import { MyReportResolverService } from './my-report-resolver.service';

describe('MyReportResolverService', () => {
  let service: MyReportResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyReportResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
