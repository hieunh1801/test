import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmeServicesTableComponent } from './adme-services-table.component';

describe('AdmeServicesTableComponent', () => {
  let component: AdmeServicesTableComponent;
  let fixture: ComponentFixture<AdmeServicesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmeServicesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmeServicesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
