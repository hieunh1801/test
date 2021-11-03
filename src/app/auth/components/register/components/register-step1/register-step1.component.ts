import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { MatSnackbarService } from 'src/app/shared/services/mat-snackbar.service';

@Component({
  selector: 'app-register-step1',
  templateUrl: './register-step1.component.html',
  styleUrls: ['./register-step1.component.scss'],
})
export class RegisterStep1Component implements OnInit {
  redirectToUrl = '#';
  formValue: any;
  terms: boolean;
  privacy: boolean;
  agree: boolean;

  signUpForm1 = this.formBuilder.group({
    total_agree: [false],
    terms_agree: [false, Validators.requiredTrue],
    privacy_agree: [false, Validators.requiredTrue],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  updateCheck() {
    const formValue = this.signUpForm1.value;
    this.agree = formValue.total_agree;
    this.agree = this.agree ? true : false;

    this.signUpForm1.patchValue({
      terms_agree: this.agree,
      privacy_agree: this.agree,
    });
  }

  onSubmit() {
    if (this.signUpForm1.valid) {
      this.signUpForm1.reset();
      window.location.href = '/auth/register2';
    }
  }
}
