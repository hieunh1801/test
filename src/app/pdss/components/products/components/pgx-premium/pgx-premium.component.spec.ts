import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgxPremiumComponent } from './pgx-premium.component';

describe('PgxPremiumComponent', () => {
  let component: PgxPremiumComponent;
  let fixture: ComponentFixture<PgxPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgxPremiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgxPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
