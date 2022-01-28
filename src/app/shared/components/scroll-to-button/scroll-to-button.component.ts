import {
  animate,
  AnimationMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IntersectionObserverService } from '@animation/services/intersection-observer.service';

@Component({
  selector: 'app-scroll-to-button',
  templateUrl: './scroll-to-button.component.html',
  styleUrls: ['./scroll-to-button.component.scss'],
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ opacity: 1, transform: 'translateX(100%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0, transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class ScrollToButtonComponent implements OnInit {
  @Input() elementRef: HTMLElement;
  @Input() buttonName: string;

  isShow: boolean;

  constructor(
    private intersectionObserverService: IntersectionObserverService
  ) {}

  ngOnInit(): void {
    if (!this.elementRef) {
      throw new Error("'elementRef' is required");
    }
    this.observerIntersection();
  }

  scrollTo() {
    this.elementRef?.scrollIntoView({
      behavior: 'smooth',
    });
  }

  callbackInViewport(inViewport?: boolean, element?: Element): void {
    console.log('callbackInViewport');
    this.isShow = false;
  }

  callbackNotInViewport(inViewport?: boolean, element?: Element): void {
    console.log('callbackNotInViewport');
    this.isShow = true;
  }

  observerIntersection(): void {
    if (this.elementRef) {
      const callbackInViewPort = this.callbackInViewport.bind(this);
      const callbackNotInViewPort = this.callbackNotInViewport.bind(this);

      this.intersectionObserverService.addTarget(
        this.elementRef,
        callbackInViewPort,
        callbackNotInViewPort,
        false
      );
    }
  }
}
