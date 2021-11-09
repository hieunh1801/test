import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  contactForm = this.formBuilder.group({});
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}
}
