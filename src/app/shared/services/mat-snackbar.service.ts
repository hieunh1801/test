import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import {
  SnackbarComponent,
  SnackbarInput,
} from '@shared/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class MatSnackbarService {
  config: MatSnackBarConfig = {
    duration: 2000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };

  constructor(
    private matSnackbar: MatSnackBar,
    private translateService: TranslateService
  ) {}

  public setConfig(mConfig: MatSnackBarConfig): void {
    this.config = mConfig;
  }

  open(message: string, action: string): void {
    // this.matSnackbar.open(message, action, this.config);
    const customSnackbarInput: SnackbarInput = {
      action: action,
      message: message,
    };
    this.matSnackbar.openFromComponent(SnackbarComponent, {
      data: customSnackbarInput,
      panelClass: ['spmed-snackbar'],
      ...this.config,
    });
  }

  openCreateSuccess(): void {
    const message = this.translateService.instant(
      'MAT_SNACKBAR__MESSAGES__SUCCESS'
    );
    const action = this.translateService.instant(
      'MAT_SNACKBAR__ACTION__CREATE'
    );
    this.open(message, action);
  }

  openCreateFailed(): void {
    const message = this.translateService.instant(
      'MAT_SNACKBAR__MESSAGES__FAILED'
    );
    const action = this.translateService.instant(
      'MAT_SNACKBAR__ACTION__CREATE'
    );
    this.open(message, action);
  }

  openUpdateSuccess(): void {
    const message = this.translateService.instant(
      'MAT_SNACKBAR__MESSAGES__SUCCESS'
    );
    const action = this.translateService.instant(
      'MAT_SNACKBAR__ACTION__UPDATE'
    );
    this.open(message, action);
  }

  openUpdateFailed(): void {
    const message = this.translateService.instant(
      'MAT_SNACKBAR__MESSAGES__FAILED'
    );
    const action = this.translateService.instant(
      'MAT_SNACKBAR__ACTION__UPDATE'
    );
    this.open(message, action);
  }

  openDeleteSuccess(): void {
    const message = this.translateService.instant(
      'MAT_SNACKBAR__MESSAGES__SUCCESS'
    );
    const action = this.translateService.instant(
      'MAT_SNACKBAR__ACTION__DELETE'
    );
    this.open(message, action);
  }

  openDeleteFailed(): void {
    const message = this.translateService.instant(
      'MAT_SNACKBAR__MESSAGES__FAILED'
    );
    const action = this.translateService.instant(
      'MAT_SNACKBAR__ACTION__DELETE'
    );
    this.open(message, action);
  }

  openLoadSuccess(): void {
    const message = this.translateService.instant(
      'MAT_SNACKBAR__MESSAGES__SUCCESS'
    );
    const action = this.translateService.instant('MAT_SNACKBAR__ACTION__LOAD');
    this.open(message, action);
  }

  openLoadFailed(message?: string): void {
    message =
      message ||
      this.translateService.instant('MAT_SNACKBAR__MESSAGES__FAILED');
    const action = this.translateService.instant('MAT_SNACKBAR__ACTION__LOAD');
    this.open(message, action);
  }
}
