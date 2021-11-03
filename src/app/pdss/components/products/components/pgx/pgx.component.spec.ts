import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgxComponent } from './pgx.component';

describe('PgxComponent', () => {
  let component: PgxComponent;
  let fixture: ComponentFixture<PgxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
