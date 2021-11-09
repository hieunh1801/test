import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { MustMatch } from '@shared/classes/must-match.validator';
import {
  AuthService,
  CustomerUserCreateRequest,
  CustomerUserCreateResponse,
} from '@auth/services/auth.service';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { TokenStorageService } from '@shared/services/token-storage.service';
import { LocalStorageService } from '@shared/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [DatePipe],
})
export class RegisterComponent implements OnInit {
  isPageLoading = false;

  genders: GenderArray[] = [
    { dataEn: 'Male', dataKr: '남', value: 1 },
    { dataEn: 'Female', dataKr: '여', value: -1 },
    { dataEn: 'Other', dataKr: '모름', value: 0 },
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

  private subscription$ = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private authService: AuthService,
    private matSnackbarService: MatSnackbarService,
    private tokenStorageService: TokenStorageService,
    private localStorage: LocalStorageService
  ) {
    this.lang = localStorage.get('lang');
  }

  ngOnInit(): void {}

  updateCheck(): void {
    const formValue = this.signUpForm1.value;
    this.agree = formValue.totalAgree;
    this.agree = this.agree ? true : false;

    this.signUpForm1.patchValue({
      termsAgree: this.agree,
      privacyAgree: this.agree,
    });
  }

  onStep2(): void {
    this.currentStep = 2;
  }
  onStep3(): void {
    this.currentStep = 3;
  }

  onSubmit(): void {
    this.signUpForm3.markAsDirty();
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
    console.log('Valid');
    if (this.signUpForm.valid) {
      const formValue = this.signUpForm.value;

      const customerUserCreateRequest: CustomerUserCreateRequest = {
        username: formValue.fusername,
        password: formValue.fpassword,
        surname: formValue.fsurname,
        givenName: formValue.fgivenname,
        email: formValue.femail,
        birthday: formValue.fdateofbirth,
        gender: formValue.fgender,
        mobile: formValue.fphone,
      };

      this.authService
        .createUser(customerUserCreateRequest)
        .pipe(
          finalize(() => {
            this.isPageLoading = false;
          })
        )
        .subscribe({
          next: (response: SpmedResponse<CustomerUserCreateResponse>) => {
            const customerUserCreateResponse: CustomerUserCreateResponse =
              response?.data?.items?.[0];
            if (customerUserCreateResponse == null) {
              this.matSnackbarService.open('SignUp process Fail', 'SIGNUP');
            } else {
              this.tokenStorageService.rememberMe = true; // todo -> add when create user
              this.tokenStorageService.accessToken =
                customerUserCreateResponse.accessToken;
              this.tokenStorageService.refreshToken =
                customerUserCreateResponse.refreshToken;
              this.tokenStorageService.username =
                customerUserCreateResponse.username;
              this.tokenStorageService.authorities =
                customerUserCreateResponse?.authorities || [];

              // window.location.href = this.redirectToUrl;
              this.router.navigate(['home']);
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

interface GenderArray {
  dataEn: string;
  dataKr: string;
  value: number;
}
