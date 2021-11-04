import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
// import { Location, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MatSnackbarService } from 'src/app/shared/services/mat-snackbar.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import {
  AuthService,
  IDCheckRequest,
  CustomerUserCreateRequest,
  CustomerUserCreateResponse,
} from '../../../../auth.service';

@Component({
  selector: 'app-register-step3',
  templateUrl: './register-step3.component.html',
  styleUrls: ['./register-step3.component.scss'],
  providers: [DatePipe],
})
export class RegisterStep3Component implements OnInit {
  signUpForm3: FormGroup;
  genders: string[] = ['Male', 'Female', 'Other'];

  constructor(private formBuilder: FormBuilder, private _datePipe: DatePipe) {
    // private _datePipe: DatePipe)
    this.createForm();
  }

  createForm() {
    this.signUpForm3 = this.formBuilder.group({
      fsirname: ['', Validators.required],
      fgivenname: ['', Validators.required],
      // validates date format yyyy-mm-dd
      fdateofbirth: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      fgender: ['', Validators.required],
      femail: ['', Validators.required, Validators.email],
      fphone: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signUpForm3.invalid) {
      return;
    }

    // let customerUserCreate: CustomerUserCreateRequest =new CustomerUserCreateRequest();
    this.signUpForm3.markAllAsTouched();
    let dob = this._datePipe.transform(
      this.signUpForm3.value.fdateofbirth,
      'yyyy-MM-dd'
    );
    console.log(dob);
    // sampleCreate.receiptDate = this._datePipe.transform(sampleFormValue.sampleReceiptDate, 'yyyy-MM-dd');

    if (this.signUpForm3.valid) {
      this.signUpForm3.reset();
      window.location.href = '/auth/login';
    }
  }
}
