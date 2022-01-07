import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSectionProductsComponent } from './overview-section-products.component';

describe('OverviewSectionProductsComponent', () => {
  let component: OverviewSectionProductsComponent;
  let fixture: ComponentFixture<OverviewSectionProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewSectionProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewSectionProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
