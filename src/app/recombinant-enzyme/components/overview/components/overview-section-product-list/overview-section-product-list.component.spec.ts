import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSectionProductListComponent } from './overview-section-product-list.component';

describe('OverviewSectionProductListComponent', () => {
  let component: OverviewSectionProductListComponent;
  let fixture: ComponentFixture<OverviewSectionProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewSectionProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewSectionProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
