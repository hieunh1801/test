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

  open(message: string, action: Action): void {
    this.matSnackbar.open(message, action, this.config);
  }
}

export type Action = 'CREATE' | 'GET' | 'UPDATE' | 'DELETE' | 'LOGIN';
