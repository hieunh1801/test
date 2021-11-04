import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MatSnackbarService {
  config: MatSnackBarConfig = {
    duration: 2000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };

  constructor(private matSnackbar: MatSnackBar) {}

  public setConfig(mConfig: MatSnackBarConfig): void {
    this.config = mConfig;
  }

  open(message: string, action: string): void {
    this.matSnackbar.open(message, action, this.config);
  }
}
