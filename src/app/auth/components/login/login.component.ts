import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthService,
  LoginRequest,
  LoginResponse,
} from '@auth/services/auth.service';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { TokenStorageService } from '@shared/services/token-storage.service';
import { finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { PageLoadingService } from '@shared/services/page-loading.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  redirectFromUrl = '#';

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [true, Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private matSnackbarService: MatSnackbarService,
    private translateService: TranslateService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private pageLoadingService: PageLoadingService
  ) {
    this.activeRoute.queryParams.subscribe((queryParams) => {
      this.redirectFromUrl = queryParams?.redirectFromUrl || '';
    });
  }

  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  login(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      const rememberMe = formValue.rememberMe;

      const loginRequest: LoginRequest = {
        username: formValue.username,
        password: formValue.password,
      };
      this.pageLoadingService.startLoading();

      this.tokenStorageService.rememberMe = rememberMe;

      this.authService
        .login(loginRequest)
        .pipe(
          finalize(() => {
            this.pageLoadingService.stopLoading();
          })
        )
        .subscribe({
          next: (response: SpmedResponse<LoginResponse>) => {
            const loginResponse: LoginResponse = response?.data?.items[0];
            if (loginResponse == null) {
              const message = this.translateService.instant(
                'LAYOUT__AUTH__LOGIN__MISMATCH__INFORMATION'
              );
              const action = this.translateService.instant(
                'MAT_SNACKBAR__ACTION__LOGIN'
              );
              this.matSnackbarService.open(message, action);
            } else {
              this.tokenStorageService.accessToken = loginResponse.accessToken;
              this.tokenStorageService.refreshToken =
                loginResponse.refreshToken;
              this.tokenStorageService.username = loginResponse.username;
              this.tokenStorageService.authorities =
                loginResponse?.authorities || [];

              this.router.navigate([this.redirectFromUrl]);
            }
          },
          complete: () => {
            // console.log('this.authService.login done!!!');
          },
          error: (error) => {
            console.error(error.response);
            const message2 = this.translateService.instant(
              'LAYOUT__AUTH__LOGIN__SERVER__NOT__RESPONSE'
            );
            const action2 = this.translateService.instant(
              'MAT_SNACKBAR__ACTION__LOGIN'
            );
            this.matSnackbarService.open(message2, action2);
          },
        });
    }
  }

  loginWithNaver(): void {}

  loginWithKakaoTalk(): void {}
}
