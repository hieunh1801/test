import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-step1',
  templateUrl: './register-step1.component.html',
  styleUrls: ['./register-step1.component.scss'],
})
export class RegisterStep1Component implements OnInit {
  signUpForm1 = this.formBuilder.group({
    /*username: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false, Validators.required],
    */
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}
}
