import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-step2',
  templateUrl: './register-step2.component.html',
  styleUrls: ['./register-step2.component.scss'],
})
export class RegisterStep2Component implements OnInit {
  signUpForm2 = this.formBuilder.group({
    fusername: ['', Validators.required],
    fpassword: ['', Validators.required, Validators.minLength(4)],
    repassword: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.signUpForm2.valid) {
      this.signUpForm2.reset();
      window.location.href = '/auth/register3';
    }
  }
}
