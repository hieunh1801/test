import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  ConfirmDialogComponent,
  ConfirmDialogInput,
  ConfirmDialogOutput,
} from '@shared/components/confirm-dialog/confirm-dialog.component';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { PageLoadingService } from '@shared/services/page-loading.service';
import { MustMatch } from '@shared/validators/must-match.validator';
import { mustNotMatchValidator } from '@shared/validators/must-not-match.validator';
import {
  ChangePasswordExceptionCode,
  UserSettingsService,
} from '@user/services/user-settings.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  resetPasswordForm = this.formBuilder.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      reNewPassword: ['', Validators.required],
    },
    {
      validator: [
        MustMatch('newPassword', 'reNewPassword'),
        mustNotMatchValidator('currentPassword', 'newPassword'),
      ],
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private userSettingsService: UserSettingsService,
    private pageLoadingService: PageLoadingService,
    private matSnackbarService: MatSnackbarService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {}

  submit(): void {
    this.resetPasswordForm.markAllAsTouched();
    this.resetPasswordForm.markAsDirty();

    const isValid = this.resetPasswordForm.valid;
    if (isValid) {
      const input: ConfirmDialogInput = {
        title: this.translateService.instant(
          'USER__USER_SETTINGS__CHANGE_PASSWORD_CONFIRM_DIALOG__CONFIRM_CHANGE_PASSWORD'
        ),
        content: this.translateService.instant(
          'USER__USER_SETTINGS__CHANGE_PASSWORD_CONFIRM_DIALOG__ARE_YOU_SURE_TO_CHANGE_PASSWORD'
        ),
      };
      const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
        data: input,
      });

      dialogRef.afterClosed().subscribe((result: ConfirmDialogOutput) => {
        if (result.action === 'yes') {
          this.changePassword();
        }
      });
    }
  }

  changePassword(): void {
    const isFormValid = this.resetPasswordForm.valid;
    if (isFormValid) {
      const formValue = this.resetPasswordForm.value;
      const currentPassword = formValue.currentPassword;
      const newPassword = formValue.newPassword;

      this.pageLoadingService.startLoading();
      this.userSettingsService
        .changePassword(currentPassword, newPassword)
        .pipe(
          finalize(() => {
            this.pageLoadingService.stopLoading();
          })
        )
        .subscribe({
          next: (response) => {
            if (response?.status?.code === 'success') {
              const message = this.translateService.instant(
                'USER__USER_SETTINGS__PASSWORD_SETTINGS__CHANGE_PASSWORD_SUCCESS'
              );
              const action = this.translateService.instant(
                'MAT_SNACKBAR__ACTION__UPDATE'
              );
              this.matSnackbarService.open(message, action);
            } else {
              throw new Error();
            }
          },
          error: (error) => {
            const response: SpmedResponse<any> = error?.error || null;
            const statusResponse: SpmedStatusResponse =
              response?.status || null;
            const code = statusResponse?.code || null;
            let message = this.translateService.instant(
              'USER__USER_SETTINGS__PASSWORD_SETTINGS__CHANGE_PASSWORD_FAILED'
            );
            switch (code) {
              case ChangePasswordExceptionCode.passwordIncorrect:
                message += this.translateService.instant(
                  'USER__USER_SETTINGS__PASSWORD_SETTINGS__PASSWORD_INCORRECT'
                );
                break;
              default:
                message += this.translateService.instant(
                  'USER__USER_SETTINGS__PASSWORD_SETTINGS__INVALID_REQUEST'
                );
            }

            const action = this.translateService.instant(
              'MAT_SNACKBAR__ACTION__UPDATE'
            );
            this.matSnackbarService.open(message, action);
          },
        });
    }
  }
  get f(): any {
    return this.resetPasswordForm.controls;
  }
}
