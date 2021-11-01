import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-register-step1',
  templateUrl: './register-step1.component.html',
  styleUrls: ['./register-step1.component.scss'],
})
export class RegisterStep1Component implements OnInit {
  signUpForm1 = this.formBuilder.group({});
  checked: boolean;
  checklist: any;

  constructor(private formBuilder: FormBuilder) {
    this.checked = false;
  }

  ngOnInit(): void {}

  selectAll() {
    var value = this.checked ? false : true;
  }
}
