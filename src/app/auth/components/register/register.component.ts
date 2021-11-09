import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { MustMatch } from '../../../shared/classes/must-match.validator';
import { DatePipe, Location } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { MatSnackbarService } from 'src/app/shared/services/mat-snackbar.service';
import {
  AuthService,
  CheckUserNameRequest,
  CustomerUserCreateRequest,
  CustomerUserCreateResponse,
} from '../../services/auth.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [DatePipe],
})
export class RegisterComponent implements OnInit {
  isPageLoading = false;

  genders: genderArray[] = [
    { data_en: 'Male', data_kr: '남', value: 1 },
    { data_en: 'Female', data_kr: '여', value: -1 },
    { data_en: 'Undefined', data_kr: '모름', value: 0 },
  ];

  redirectToUrl = '#';
  formValue: any;
  agree: boolean;
  parameter: number;
  lang: string;

  currentStep = 1;

  signUpForm1 = this.formBuilder.group({
    // add form 1 information here
    totalAgree: [''],
    termsAgree: ['', Validators.requiredTrue],
    privacyAgree: ['', Validators.requiredTrue],
  });

  signUpForm2 = this.formBuilder.group(
    {
      // TODO add form 2 information here
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
    },
    { validator: MustMatch('fpassword', 'repassword') }
  );

  signUpForm3 = this.formBuilder.group({
    // TODO add form3 here
    fsurname: ['', Validators.required],
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
    femail: ['', Validators.required],
    fphone: ['', Validators.required],
  });

  private subscription$ = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private authService: AuthService,
    private matSnackbarService: MatSnackbarService,
    private localStorage: LocalStorageService
  ) {
    this.lang = localStorage.get('lang');
    // console.log(this.lang);
  }

  ngOnInit(): void {}

  signUpForm = this.formBuilder.group({
    termsAgree: ['', Validators.requiredTrue],
    privacyAgree: ['', Validators.requiredTrue],
    fusername: ['', Validators.required],
    fpassword: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(12)],
    ],
    fsurname: ['', Validators.required],
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
    femail: ['', Validators.required],
    fphone: ['', Validators.required],
  });

  updateCheck() {
    const formValue = this.signUpForm1.value;
    this.agree = formValue.totalAgree;
    this.agree = this.agree ? true : false;

    this.signUpForm1.patchValue({
      termsAgree: this.agree,
      privacyAgree: this.agree,
    });
  }

  onStep2() {
    // TODO: because of form will submit (send a request to server) if we touch enter so we need to prevent this
    // TODO: change current step is 2
    this.currentStep = 2;
  }
  onStep3() {
    this.currentStep = 3;
  }

  onSubmit(): void {
    this.signUpForm3.markAsDirty(); // ok i know this meaning : form input change
    const form1Value = this.signUpForm1.value;
    const form2Value = this.signUpForm2.value;
    const form3Value = this.signUpForm3.value;
    // const dob = this.datePipe.transform(form3Value.fdateofbirth, 'yyyy-MM-dd');

    this.signUpForm.patchValue({
      // add all signUpForm field here
      termsAgree: form1Value.termsAgree,
      privacyAgree: form1Value.privacyAgree,
      fusername: form2Value.fusername,
      fpassword: form2Value.fpassword,
      fsurname: form3Value.fsurname,
      fgivenname: form3Value.fgivenname,
      fdateofbirth: form3Value.fdateofbirth,
      fgender: form3Value.fgender,
      femail: form3Value.femail,
      fphone: form3Value.fphone,
    });
    //console.log(this.signUpForm.value);

    // call api sign up => I will do that after you done =))
    if (this.signUpForm.valid) {
      const formValue = this.signUpForm.value;

      const CustomerUserCreateRequest: CustomerUserCreateRequest = {
        username: formValue.fusername,
        password: formValue.fpassword,
        surname: formValue.fsurname,
        givenName: formValue.fgivenname,
        email: formValue.femail,
        birthday: formValue.fdateofbirth,
        gender: formValue.fgender,
        mobile: formValue.fphone,
        role: 3,
      };

      this.authService
        .createUser(CustomerUserCreateRequest)
        .pipe(
          finalize(() => {
            this.isPageLoading = false;
          })
        )
        .subscribe({
          next: (response: SpmedResponse<CustomerUserCreateResponse>) => {
            const CustomerUserCreateResponse: CustomerUserCreateResponse =
              response?.data?.items[0];
            if (CustomerUserCreateResponse == null) {
              this.matSnackbarService.open('SignUp process Fail', 'SIGNUP');
            } else {
              // window.location.href = this.redirectToUrl;
              this.router.navigate(['auth/login']);
            }
          },
          complete: () => {
            console.log('this.authService.Register done!!!');
          },
          error: (error) => {
            console.log(error.response);
            this.matSnackbarService.open(
              'Sign up failed. Server is not response',
              'SIGNUP'
            );
          },
        });
    }
  }
}

interface genderArray {
  data_en: string;
  data_kr: string;
  value: number;
}
