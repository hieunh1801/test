import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmeComponent } from './adme.component';

describe('AdmeComponent', () => {
  let component: AdmeComponent;
  let fixture: ComponentFixture<AdmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
