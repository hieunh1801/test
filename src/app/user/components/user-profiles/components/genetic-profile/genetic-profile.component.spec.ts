import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneticProfileComponent } from './genetic-profile.component';

describe('GeneticProfileComponent', () => {
  let component: GeneticProfileComponent;
  let fixture: ComponentFixture<GeneticProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneticProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneticProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
