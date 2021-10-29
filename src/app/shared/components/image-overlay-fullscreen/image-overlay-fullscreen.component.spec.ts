import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageOverlayFullscreenComponent } from './image-overlay-fullscreen.component';

describe('ImageOverlayFullscreenComponent', () => {
  let component: ImageOverlayFullscreenComponent;
  let fixture: ComponentFixture<ImageOverlayFullscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageOverlayFullscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageOverlayFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
