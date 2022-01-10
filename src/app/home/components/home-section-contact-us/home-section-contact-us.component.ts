import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home-section-contact-us',
  templateUrl: './home-section-contact-us.component.html',
  styleUrls: ['./home-section-contact-us.component.scss'],
})
export class HomeSectionContactUsComponent implements OnInit {
  contactForm = this.formBuilder.group({
    name: [''],
    email: [''],
    message: [''],
  });
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    // not implement
  }
}
