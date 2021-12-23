import { TestBed } from '@angular/core/testing';

import { PdssInterpretationService } from './pdss-interpretation.service';

describe('PdssInterpretationService', () => {
  let service: PdssInterpretationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdssInterpretationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
