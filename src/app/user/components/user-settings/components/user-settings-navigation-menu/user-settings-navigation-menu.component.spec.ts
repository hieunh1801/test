import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsNavigationMenuComponent } from './user-settings-navigation-menu.component';

describe('UserSettingsNavigationMenuComponent', () => {
  let component: UserSettingsNavigationMenuComponent;
  let fixture: ComponentFixture<UserSettingsNavigationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSettingsNavigationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingsNavigationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
