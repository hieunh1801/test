import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { MustMatch } from '../../../shared/classes/must-match.validator';
import { DatePipe } from '@angular/common';
import {
  AuthService,
  IDCheckRequest,
  CustomerUserCreateRequest,
  CustomerUserCreateResponse,
} from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [DatePipe],
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;

  genders: string[] = ['Male', 'Female', 'Other'];
  redirectToUrl = '#';
  formValue: any;
  agree: boolean;
  step: number;
  parameter: number;
  isShowStep1 = false;
  isShowStep2 = false;
  isShowStep3 = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _datePipe: DatePipe
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.step = +params.step;
    });

    if (!this.step) {
      this.step = 1;
    }
    console.log(this.step);

    if (this.step == 1) {
      this.isShowStep1 = true;
    } else if (this.step == 2) {
      this.isShowStep2 = true;
    } else if (this.step == 3) {
      this.isShowStep3 = true;
    }
  }

  createForm() {
    this.signUpForm = this.formBuilder.group(
      {
        total_agree: [false],
        terms_agree: [false, Validators.requiredTrue],
        privacy_agree: [false, Validators.requiredTrue],
        fusername: ['', Validators.required],
        fpassword: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(12),
          ],
        ],
        repassword: ['', Validators.required],
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
      },
      { validator: MustMatch('fpassword', 'repassword') }
    );
  }

  get f() {
    return this.signUpForm.value;
  }

  updateCheck() {
    const formValue = this.signUpForm.value;
    this.agree = formValue.total_agree;
    this.agree = this.agree ? true : false;

    this.signUpForm.patchValue({
      terms_agree: this.agree,
      privacy_agree: this.agree,
    });
  }

  onStep2() {
    // this.router.navigate(['/auth/register'], { queryParams: { step: 2 } });
    window.location.href = '/auth/register?step=2';
    if (this.signUpForm.valid) {
      // this.signUpForm.reset();
    }
  }
  onStep3() {
    window.location.href = '/auth/register?step=3';
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      return;
    }

    // let customerUserCreate: CustomerUserCreateRequest =new CustomerUserCreateRequest();
    this.signUpForm.markAllAsTouched();
    let dob = this._datePipe.transform(
      this.signUpForm.value.fdateofbirth,
      'yyyy-MM-dd'
    );
    console.log(dob);
    // sampleCreate.receiptDate = this._datePipe.transform(sampleFormValue.sampleReceiptDate, 'yyyy-MM-dd');

    if (this.signUpForm.valid) {
      this.signUpForm.reset();
      window.location.href = '/auth/login';
    }
  }
}
