import { TestBed } from '@angular/core/testing';

import { MatSnackbarService } from './mat-snackbar.service';

describe('MatSnackbarService', () => {
  let service: MatSnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatSnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
