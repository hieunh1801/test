import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  PdssInterpretationService,
  Roe,
} from '@pdss/components/my-report/services/pdss-interpretation.service';
import { Observable, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-reference-list-dialog',
  templateUrl: './reference-list-dialog.component.html',
  styleUrls: ['./reference-list-dialog.component.scss'],
})
export class ReferenceListDialogComponent implements OnInit {
  roeListLoading = false;
  roeList: Roe[] = null;

  constructor(
    public dialogRef: MatDialogRef<ReferenceListDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dialogInputData: ReferenceListDialogInputData,
    private pdssInterpretationService: PdssInterpretationService
  ) {}

  ngOnInit(): void {
    const interpretationId = this.dialogInputData.interpretationId;
    this.loadRoeList(interpretationId);
  }

  loadRoeList(interpretationId: number): void {
    if (!interpretationId) {
      return;
    }
    this.roeListLoading = true;
    this.pdssInterpretationService
      .getInterpretationRoes(interpretationId)
      .pipe(
        finalize(() => {
          this.roeListLoading = false;
        })
      )
      .subscribe((response) => {
        const items = response?.data?.items || [];
        this.roeList = items;
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

export interface ReferenceListDialogInputData {
  interpretationId: number;
}

export interface ReferenceListDialogOutputData {}
