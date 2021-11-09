import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceListDialogComponent } from './reference-list-dialog.component';

describe('ReferenceListDialogComponent', () => {
  let component: ReferenceListDialogComponent;
  let fixture: ComponentFixture<ReferenceListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
