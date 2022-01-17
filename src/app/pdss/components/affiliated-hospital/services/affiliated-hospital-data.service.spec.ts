import { TestBed } from '@angular/core/testing';

import { AffiliatedHospitalDataService } from './affiliated-hospital-data.service';

describe('AffiliatedHospitalDataService', () => {
  let service: AffiliatedHospitalDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffiliatedHospitalDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
