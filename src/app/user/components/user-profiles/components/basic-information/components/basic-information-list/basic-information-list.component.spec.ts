import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInformationListComponent } from './basic-information-list.component';

describe('BasicInformationListComponent', () => {
  let component: BasicInformationListComponent;
  let fixture: ComponentFixture<BasicInformationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicInformationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInformationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
