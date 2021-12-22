import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogInput
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    const output: ConfirmDialogOutput = {
      action: 'no',
    };
    this.dialogRef.close(output);
  }

  onYesClick(): void {
    const output: ConfirmDialogOutput = {
      action: 'yes',
    };
    this.dialogRef.close(output);
  }
}

export interface ConfirmDialogInput {
  title: string;
  content: string;
}

export interface ConfirmDialogOutput {
  action: 'yes' | 'no';
}
