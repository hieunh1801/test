import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleGeneServiceComponent } from './single-gene-service.component';

describe('SingleGeneServiceComponent', () => {
  let component: SingleGeneServiceComponent;
  let fixture: ComponentFixture<SingleGeneServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleGeneServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleGeneServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
