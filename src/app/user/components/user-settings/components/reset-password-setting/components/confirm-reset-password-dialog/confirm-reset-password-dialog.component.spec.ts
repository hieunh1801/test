import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmResetPasswordDialogComponent } from './confirm-reset-password-dialog.component';

describe('ConfirmResetPasswordDialogComponent', () => {
  let component: ConfirmResetPasswordDialogComponent;
  let fixture: ComponentFixture<ConfirmResetPasswordDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmResetPasswordDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmResetPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
