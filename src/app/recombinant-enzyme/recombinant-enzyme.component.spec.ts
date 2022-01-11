import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecombinantEnzymeComponent } from './recombinant-enzyme.component';

describe('RecombinantEnzymeComponent', () => {
  let component: RecombinantEnzymeComponent;
  let fixture: ComponentFixture<RecombinantEnzymeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecombinantEnzymeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecombinantEnzymeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
