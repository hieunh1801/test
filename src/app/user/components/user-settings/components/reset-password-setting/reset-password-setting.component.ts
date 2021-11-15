import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MustMatch } from '@shared/validators/must-match.validator';
import { mustNotMatchValidator } from '@shared/validators/must-not-match.validator';

@Component({
  selector: 'app-reset-password-setting',
  templateUrl: './reset-password-setting.component.html',
  styleUrls: ['./reset-password-setting.component.scss'],
})
export class ResetPasswordSettingComponent implements OnInit {
  resetPasswordForm = this.formBuilder.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required, Validators.minLength(6)],
      reNewPassword: ['', Validators.required],
    },
    {
      validators: [
        MustMatch('newPassword', 'reNewPassword'),
        mustNotMatchValidator('currentPassword', 'newPassword'),
      ],
    }
  );

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  submit(): void {
    this.resetPasswordForm.markAllAsTouched();

    const isValid = this.resetPasswordForm.valid;
    if (isValid) {
      console.log(this.resetPasswordForm.value);
    }
  }

  get f() {
    return this.resetPasswordForm.controls;
  }
}
