import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-register-success-dialog',
  templateUrl: './register-success-dialog.component.html',
  styleUrls: ['./register-success-dialog.component.scss'],
})
export class RegisterSuccessDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<RegisterSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RegisterSuccessDialogInput
  ) {}

  ngOnInit(): void {}
  onClose(): void {
    this.dialogRef.close();
  }

  onLogin(): void {
    this.dialogRef.close();
  }
}

export interface RegisterSuccessDialogInput {
  returnUrl?: string;
}
