import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-step2',
  templateUrl: './register-step2.component.html',
  styleUrls: ['./register-step2.component.scss'],
})
export class RegisterStep2Component implements OnInit {
  signUpForm2 = this.formBuilder.group({
    /*username: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false, Validators.required],
    */
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}
}
