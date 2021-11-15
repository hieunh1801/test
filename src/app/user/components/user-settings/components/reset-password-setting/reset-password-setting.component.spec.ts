import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordSettingComponent } from './reset-password-setting.component';

describe('ResetPasswordSettingComponent', () => {
  let component: ResetPasswordSettingComponent;
  let fixture: ComponentFixture<ResetPasswordSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
