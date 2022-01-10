import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenotypingKitComponent } from './genotyping-kit.component';

describe('GenotypingKitComponent', () => {
  let component: GenotypingKitComponent;
  let fixture: ComponentFixture<GenotypingKitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenotypingKitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenotypingKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
