import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MatSnackbarService } from 'src/app/shared/services/mat-snackbar.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { AuthService, LoginRequest, LoginResponse } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isPageLoading = false;
  redirectToUrl = '#';

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false, Validators.required],
  });

  private subscription$ = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private matSnackbarService: MatSnackbarService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.queryParams.subscribe((queryParams) => {
      const url = queryParams?.url || '';
      if (url && url.startsWith('http')) {
        this.redirectToUrl = url;
      }
    });
  }

  ngOnInit(): void {}

  login(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const formValue = this.loginForm.value;
      const rememberMe = formValue.rememberMe;

      const loginRequest: LoginRequest = {
        username: formValue.username,
        password: formValue.password,
      };
      this.isPageLoading = true;

      this.tokenStorageService.rememberMe = rememberMe;

      this.authService
        .login(loginRequest)
        .pipe(
          finalize(() => {
            this.isPageLoading = false;
          })
        )
        .subscribe({
          next: (response: SpmedResponse<LoginResponse>) => {
            const loginResponse: LoginResponse = response?.data?.items[0];
            if (loginResponse == null) {
              this.matSnackbarService.open(
                'Username or Password incorrect',
                'LOGIN'
              );
            } else {
              this.tokenStorageService.accessToken = loginResponse.accessToken;
              this.tokenStorageService.refreshToken =
                loginResponse.refreshToken;
              this.tokenStorageService.username = loginResponse.username;
              this.tokenStorageService.authorities =
                loginResponse?.authorities || [];

              window.location.href = this.redirectToUrl;
            }
          },
          complete: () => {
            console.log('this.authService.login done!!!');
          },
          error: (error) => {
            console.log(error.response);
            this.matSnackbarService.open(
              'Login failed. Server is not response',
              'LOGIN'
            );
          },
        });
    }
  }

  loginWithNaver(): void {}

  loginWithKakaoTalk(): void {}
}
