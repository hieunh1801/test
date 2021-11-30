import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { finalize, distinctUntilChanged } from 'rxjs/operators';

import {
  AuthService,
  CustomerUserCreateRequest,
  CustomerUserCreateResponse,
  CheckUserNameRequest,
  CheckUserNameResponse,
  CheckEmailRequest,
  CheckEmailResponse,
} from '@auth/services/auth.service';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { TokenStorageService } from '@shared/services/token-storage.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { PageLoadingService } from '@shared/services/page-loading.service';
import { MatDialog } from '@angular/material/dialog';
import {
  RegisterSuccessDialogComponent,
  RegisterSuccessDialogInput,
} from './components/register-success-dialog/register-success-dialog.component';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { MustMatch } from '@shared/validators/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [DatePipe],
})
export class RegisterComponent implements OnInit, OnDestroy {
  genderMale = this.translateService.instant(
    'LAYOUT__AUTH__REGISTER__GENDER__MALE'
  );
  genderFemale = this.translateService.instant(
    'LAYOUT__AUTH__REGISTER__GENDER__FEMALE'
  );
  genderOther = this.translateService.instant(
    'LAYOUT__AUTH__REGISTER__GENDER__OTHER'
  );

  termsText = this.translateService.instant(
    'LAYOUT__AUTH__REGISTER__TERMS__CONTENTS'
  );
  privacyText = this.translateService.instant(
    'LAYOUT__AUTH__REGISTER__PRIVACY__CONTENTS'
  );

  genders: GenderArray[] = [
    { data: this.genderMale, value: 1 },
    { data: this.genderFemale, value: -1 },
    { data: this.genderOther, value: 0 },
  ];
  redirectToUrl = '#';
  formValue: any;
  agree: boolean;
  parameter: number;
  lang: string;
  isValidID: boolean;
  isValidEmail: boolean;
  isCheckingId: boolean = null;
  isCheckingEmail: boolean = null;
  checkId: boolean;

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
      fpassword: ['', [Validators.required, Validators.minLength(4)]],
      repassword: ['', Validators.required],
    },
    {
      validator: [MustMatch('fpassword', 'repassword')],
    }
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
    private localStorage: LocalStorageService,
    private translateService: TranslateService,
    private pageLoadingService: PageLoadingService,
    private dialog: MatDialog
  ) {
    this.lang = localStorage.get('lang');
  }

  ngOnInit(): void {
    // this.signUpForm2
    //   .get('fusername')
    //   .valueChanges.pipe(distinctUntilChanged())
    //   .subscribe((term) => {
    //     this.checkId = true;
    //   });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

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
    this.signUpForm1.markAsDirty();
    if (this.signUpForm1.valid) {
      this.currentStep = 2;
    }
  }

  onStep3(): void {
    this.signUpForm2.markAsDirty();
    if (this.signUpForm2.valid) {
      this.currentStep = 3;
    }
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
    // console.log('Valid');

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

      this.pageLoadingService.startLoading();
      this.authService
        .createUser(customerUserCreateRequest)
        .pipe(
          finalize(() => {
            this.pageLoadingService.stopLoading();
          })
        )
        .subscribe({
          next: (response: SpmedResponse<CustomerUserCreateResponse>) => {
            const customerUserCreateResponse: CustomerUserCreateResponse =
              response?.data?.items?.[0];
            if (customerUserCreateResponse == null) {
              const message = this.translateService.instant(
                'LAYOUT__AUTH__REGISTER__PROCESS_FAIL'
              );
              const action = this.translateService.instant(
                'MAT_SNACKBAR__ACTION__SIGN_UP'
              );
              this.matSnackbarService.open(message, action);
            } else {
              // this.tokenStorageService.rememberMe = true; // todo -> add when create user
              // this.tokenStorageService.accessToken =
              //   customerUserCreateResponse.accessToken;
              // this.tokenStorageService.refreshToken =
              //   customerUserCreateResponse.refreshToken;
              // this.tokenStorageService.username =
              //   customerUserCreateResponse.username;
              // this.tokenStorageService.authorities =
              //   customerUserCreateResponse?.authorities || [];

              // const dialogInputData: RegisterSuccessDialogInput = {};
              // this.dialog.open(RegisterSuccessDialogComponent, {
              //   data: dialogInputData,
              // });

              this.router.navigate(['auth', 'register-success']);
            }
          },
          complete: () => {
            // console.log('this.authService.Register done!!!');
          },
          error: (error) => {
            // console.log(error.response);
            const message2 = this.translateService.instant(
              'LAYOUT__AUTH__REGISTER__SERVER__NOT__RESPONSE'
            );
            const action2 = this.translateService.instant(
              'MAT_SNACKBAR__ACTION__SIGN_UP'
            );
            this.matSnackbarService.open(message2, action2);
          },
        });
    }
  }

  onCheckId(): void {
    const form2Value = this.signUpForm2.value;
    const username = form2Value.fusername;
    if (!username) {
      return;
    }
    const checkUserNameRequest: CheckUserNameRequest = {
      username: username,
    };
    this.isCheckingId = true;
    this.authService
      .getID(checkUserNameRequest)
      .pipe(
        finalize(() => {
          this.isCheckingId = false;
        })
      )
      .subscribe({
        next: (response: SpmedResponse<CheckUserNameResponse>) => {
          const checkUserNameResponse: CheckUserNameResponse =
            response?.data?.items?.[0];
          if (checkUserNameResponse == null) {
          } else {
            this.isValidID = checkUserNameResponse.isValid;
            this.checkId = null;
          }
        },
        complete: () => {
          console.log('this.authService.Check ID done!!!');
        },
        error: (error) => {
          console.log(error.response);
        },
      });
  }

  onCheckEmail(): void {
    const form3Value = this.signUpForm3.value;
    const femail = form3Value.femail;
    if (!femail) {
      return;
    }
    const checkEmailRequest: CheckEmailRequest = {
      email: femail,
    };
    this.isCheckingEmail = true;
    this.authService
      .getEmail(checkEmailRequest)
      .pipe(
        finalize(() => {
          this.isCheckingEmail = false;
        })
      )
      .subscribe({
        next: (response: SpmedResponse<CheckEmailResponse>) => {
          const checkEmailResponse: CheckEmailResponse =
            response?.data?.items?.[0];
          if (checkEmailResponse == null) {
          } else {
            this.isValidEmail = checkEmailResponse.isValid;
          }
        },
        complete: () => {
          console.log('this.authService.Check Email done!!!');
        },
        error: (error) => {
          console.log(error.response);
        },
      });
  }
}

interface GenderArray {
  data: string;
  value: number;
}
