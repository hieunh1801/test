import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';

@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.scss'],
})
export class ContactInformationComponent implements OnInit {
  contactForm = this.formBuilder.group({
    name: [''],
    email: [''],
    message: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private matSnackbarService: MatSnackbarService
  ) {}

  ngOnInit(): void {}

  onClickSendMessage(): void {
    this.matSnackbarService.open('Send message success', 'MESSAGE');
  }
}
