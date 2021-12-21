import { TestBed } from '@angular/core/testing';

import { PdssAtcCodeService } from './pdss-atc-code.service';

describe('PdssAtcCodeService', () => {
  let service: PdssAtcCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdssAtcCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
