import { TestBed } from '@angular/core/testing';

import { AdmeServiceDataService } from './adme-service-data.service';

describe('AdmeServiceDataService', () => {
  let service: AdmeServiceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmeServiceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
