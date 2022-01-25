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
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-scroll-up-button',
  templateUrl: './scroll-up-button.component.html',
  styleUrls: ['./scroll-up-button.component.scss'],
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translate3d(0, 20%, 0)' }),
        animate(
          '200ms',
          style({ opacity: 1, transform: 'translate3d(0, 0, 0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '100ms',
          style({ opacity: 0, transform: 'translate3d(0, 20%, 0)' })
        ),
      ]),
    ]),
  ],
})
export class ScrollUpButtonComponent implements OnInit {
  @ViewChild('scrollButton') scrollButton: ElementRef;
  isShow = false;
  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 500
    ) {
      // (this.scrollButton?.nativeElement as HTMLElement).style.display = 'flex';
      this.isShow = true;
    } else {
      this.isShow = false;
      // (this.scrollButton?.nativeElement as HTMLElement).style.display = 'none';
    }
  }

  scrollUp() {
    document.body.scrollIntoView({
      behavior: 'smooth',
    });
    document.documentElement.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
