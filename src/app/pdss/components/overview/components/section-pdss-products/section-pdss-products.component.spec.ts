import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPdssProductsComponent } from './section-pdss-products.component';

describe('SectionPdssProductsComponent', () => {
  let component: SectionPdssProductsComponent;
  let fixture: ComponentFixture<SectionPdssProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionPdssProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionPdssProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
