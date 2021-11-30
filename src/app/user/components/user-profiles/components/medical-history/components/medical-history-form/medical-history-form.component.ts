import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateUtilService } from '@shared/services/date-util.service';
import {
  DrugSynonym,
  UserDrugSynonymService,
} from '@user/services/user-drug-synonym.service';
import {
  MedicalHistoryPostRequest,
  MedicalHistoryPutRequest,
} from '@user/services/user-medical-history.service';
import { MedicalHistory } from '@user/services/user-profile.service';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-medical-history-form',
  templateUrl: './medical-history-form.component.html',
  styleUrls: ['./medical-history-form.component.scss'],
})
export class MedicalHistoryFormComponent implements OnInit, OnDestroy {
  @Input() medicalHistory: MedicalHistory = null;

  @Output() cancelEvent = new EventEmitter();
  @Output() createEvent = new EventEmitter<MedicalHistoryPostRequest>();
  @Output() saveEvent = new EventEmitter<{
    medicalHistoryId: number;
    putRequest: MedicalHistoryPutRequest;
  }>();

  drugSynonymOptions: DrugSynonym[] = null;

  mode: 'ADD' | 'EDIT' = null;
  medicalForm: FormGroup = null;

  subscription$ = new Subscription();

  initForm(): void {
    if (this.medicalHistory && this.medicalHistory.id > 0) {
      this.mode = 'EDIT';
      const { drug, note, fromDate, toDate } = this.medicalHistory;
      this.medicalForm = this.formBuilder.group({
        drug: [drug, [Validators.required]],
        note: [note],
        fromDate: [fromDate],
        toDate: [toDate],
      });
    } else {
      this.mode = 'ADD';
      this.medicalForm = this.formBuilder.group({
        drug: [null, [Validators.required]],
        note: [null],
        fromDate: [null],
        toDate: [null],
      });
    }
  }
  constructor(
    private formBuilder: FormBuilder,
    private dateUtilService: DateUtilService,
    private drugSynonymService: UserDrugSynonymService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.subscribeDrugChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  subscribeDrugChange(): void {
    const sub = this.medicalForm
      ?.get('drug')
      .valueChanges.pipe(distinctUntilChanged(), debounceTime(300))
      .subscribe((drug) => {
        this.drugSynonymService
          .searchDrugSynonym(drug)
          .subscribe((response) => {
            this.drugSynonymOptions = response?.data?.items || [];
          });
      });
    this.subscription$.add(sub);
  }

  get f(): any {
    return this.medicalForm.controls;
  }

  cancelClick(): void {
    this.cancelEvent.emit();
  }

  saveClick(): void {
    this.medicalForm.markAllAsTouched();

    if (!this.medicalForm.valid) {
      return;
    }
    const formValue = this.medicalForm.value;
    const drug = formValue.drug;

    // const kbDrugId =
    //   drug === this.medicalHistory?.drug
    //     ? this.medicalHistory?.kbDrugIdRef
    //     : this.drugSynonymOptions?.find(
    //         (drugSynonym) => drugSynonym.synonyms === drug
    //       )?.drugId || null;
    let kbDrugId = null;
    if (drug === this.medicalHistory?.drug) {
      kbDrugId = this.medicalHistory?.kbDrugIdRef;
    }

    if (!kbDrugId) {
      kbDrugId =
        this.drugSynonymOptions?.find(
          (drugSynonym) => drugSynonym.synonyms === drug
        )?.drugId || null;
    }

    const output: MedicalHistoryPutRequest = {
      drug: formValue.drug,
      note: formValue.note,
      kbDrugIdRef: kbDrugId,
      fromDate: this.dateUtilService.toDateString(formValue.fromDate),
      toDate: this.dateUtilService.toDateString(formValue.toDate),
    };
    this.saveEvent.emit({
      medicalHistoryId: this.medicalHistory.id,
      putRequest: output,
    });
  }

  createClick(): void {
    this.medicalForm.markAllAsTouched();
    if (!this.medicalForm.valid) {
      return;
    }
    const formValue = this.medicalForm.value;

    const drug = formValue.drug;
    const kbDrugId =
      this.drugSynonymOptions?.find(
        (drugSynonym) => drugSynonym.synonyms === drug
      )?.drugId || null;

    const output: MedicalHistoryPostRequest = {
      drug: formValue.drug,
      note: formValue.note,
      kbDrugIdRef: kbDrugId,
      fromDate: this.dateUtilService.toDateString(formValue.fromDate),
      toDate: this.dateUtilService.toDateString(formValue.toDate),
    };
    this.createEvent.emit(output);
  }
}
