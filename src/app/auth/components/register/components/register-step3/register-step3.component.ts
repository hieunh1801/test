import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-step3',
  templateUrl: './register-step3.component.html',
  styleUrls: ['./register-step3.component.scss'],
})
export class RegisterStep3Component implements OnInit {
  signUpForm3 = this.formBuilder.group({
    fsirname: ['', Validators.required],
    fgivenname: ['', Validators.required],
    // validates date format yyyy-mm-dd
    fdateofbirth: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
        ),
      ],
    ],
    fgender: ['', Validators.required],
    femail: ['', Validators.required, Validators.pattern('[^ @]*@[^ @]*')],
    fphone: ['', Validators.required],
  });

  genders: string[] = ['Male', 'Female', 'Other'];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}
}
