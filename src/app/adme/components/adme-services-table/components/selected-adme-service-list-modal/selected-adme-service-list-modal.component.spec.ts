import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedAdmeServiceListModalComponent } from './selected-adme-service-list-modal.component';

describe('SelectedAdmeServiceListModalComponent', () => {
  let component: SelectedAdmeServiceListModalComponent;
  let fixture: ComponentFixture<SelectedAdmeServiceListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedAdmeServiceListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedAdmeServiceListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
