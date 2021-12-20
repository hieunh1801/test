import { TestBed } from '@angular/core/testing';

import { PdssDrugService } from './pdss-drug.service';

describe('PdssDrugService', () => {
  let service: PdssDrugService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdssDrugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
