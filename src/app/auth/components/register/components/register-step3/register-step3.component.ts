import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-step3',
  templateUrl: './register-step3.component.html',
  styleUrls: ['./register-step3.component.scss'],
})
export class RegisterStep3Component implements OnInit {
  signUpForm3 = this.formBuilder.group({
    /*username: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false, Validators.required],
    */
  });

  genders: string[] = ['Male', 'Female', 'Other'];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}
}
