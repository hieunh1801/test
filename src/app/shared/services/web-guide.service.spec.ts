import { TestBed } from '@angular/core/testing';

import { WebGuideService } from './web-guide.service';

describe('WebGuideService', () => {
  let service: WebGuideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebGuideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
