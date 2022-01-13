import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleGeneComponent } from './single-gene.component';

describe('SingleGeneComponent', () => {
  let component: SingleGeneComponent;
  let fixture: ComponentFixture<SingleGeneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleGeneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleGeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
