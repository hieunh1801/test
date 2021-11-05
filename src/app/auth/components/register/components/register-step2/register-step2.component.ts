import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../../../../../shared/classes/must-match.validator';

@Component({
  selector: 'app-register-step2',
  templateUrl: './register-step2.component.html',
  styleUrls: ['./register-step2.component.scss'],
})
export class RegisterStep2Component implements OnInit {
  signUpForm2: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.signUpForm2 = this.formBuilder.group(
      {
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
  }

  ngOnInit(): void {}
  // convenience getter for easy access to form fields
  get f() {
    return this.signUpForm2.value;
  }

  onSubmit() {
    this.signUpForm2.markAllAsTouched();

    if (this.signUpForm2.valid) {
      this.signUpForm2.reset();
      window.location.href = '/auth/register3';
    }
  }
}
