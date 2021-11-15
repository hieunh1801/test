import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAndNotificationSettingComponent } from './email-and-notification-setting.component';

describe('EmailAndNotificationSettingComponent', () => {
  let component: EmailAndNotificationSettingComponent;
  let fixture: ComponentFixture<EmailAndNotificationSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailAndNotificationSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailAndNotificationSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
