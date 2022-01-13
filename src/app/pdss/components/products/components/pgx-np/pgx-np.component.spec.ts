import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgxNpComponent } from './pgx-np.component';

describe('PgxNpComponent', () => {
  let component: PgxNpComponent;
  let fixture: ComponentFixture<PgxNpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgxNpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgxNpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
