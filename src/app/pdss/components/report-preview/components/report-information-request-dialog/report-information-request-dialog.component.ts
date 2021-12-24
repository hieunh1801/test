import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-report-information-request-dialog',
  templateUrl: './report-information-request-dialog.component.html',
  styleUrls: ['./report-information-request-dialog.component.scss'],
})
export class ReportInformationRequestDialogComponent implements OnInit {
  // searchForm = this.formBuilder.group({
  //   surname: [''],
  //   yearOfBirth: [''],
  // });

  searchForm = this.formBuilder.group({
    surname: ['최'],
    yearOfBirth: ['1979'],
  });

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ReportInformationRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dialogInput: ReportInformationRequestDialogInput
  ) {}

  ngOnInit(): void {}

  handleOnSubmit(): void {
    const formValue = this.searchForm.value;
    const output: ReportInformationRequestDialogOutput = {
      // qrCode: this.dialogInput.qrCode,
      qrCode: 'C1052095-JZAK',
      surname: formValue.surname,
      yearOfBirth: formValue.yearOfBirth,
    };

    this.dialogRef.close(output);
  }

  handleOnCancel(): void {
    this.dialogRef.close();
  }
}

export interface ReportInformationRequestDialogInput {
  qrCode: string;
}

export interface ReportInformationRequestDialogOutput {
  qrCode: string;
  surname: string;
  yearOfBirth: string;
}
