import { TestBed } from '@angular/core/testing';

import { ObjectHelperService } from './object-helper.service';

describe('ObjectHelperService', () => {
  let service: ObjectHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
