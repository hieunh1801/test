import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reference-list-dialog',
  templateUrl: './reference-list-dialog.component.html',
  styleUrls: ['./reference-list-dialog.component.scss'],
})
export class ReferenceListDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ReferenceListDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dialogInputData: ReferenceListDialogInputData
  ) {}

  ngOnInit(): void {}

  onClose(): void {
    this.dialogRef.close();
  }
}

export interface ReferenceListDialogInputData {
  referenceOfEvidence?: string;
}

export interface ReferenceListDialogOutputData {}
