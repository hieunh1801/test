import { Injectable, Optional } from '@angular/core';

export class IntersectionObserverServiceConfig {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export type CallbackType = (inViewport?: boolean, element?: Element) => void;

export interface WatchedItem {
  element: Element;
  removeAfterIntersect?: boolean;
  callbackInViewPort: CallbackType; // callback when element is in viewport
  callbackNotInViewPort?: CallbackType; // callback when element is not in viewport
}

@Injectable({
  providedIn: 'root',
})
export class IntersectionObserverService {
  options: IntersectionObserverServiceConfig = {
    rootMargin: '0px',
    threshold: 0.1,
  };

  // where Intersection is support
  supported = false;

  watching: Array<WatchedItem> = [];

  observer: IntersectionObserver | null;

  /**
   * Assigns the user config if they wish to
   * override the defaults by using forRoot
   * @param {IntersectionObserverServiceConfig} config
   */
  constructor(@Optional() config: IntersectionObserverServiceConfig) {
    this.supported =
      'IntersectionObserver' in window && 'IntersectionObserverEntry' in window;

    if (config) {
      this.options = { ...this.options, ...config };
    }

    this.observer = this.supported
      ? new IntersectionObserver(this.handleEvent.bind(this), this.options)
      : null;
  }

  /**
   * Handles events made by the observer
   * @param {IntersectionObserverEntry[]} entries
   */
  handleEvent(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry: IntersectionObserverEntry) => {
      const target = this.watching.find((element) => {
        return element.element === entry.target;
      });

      if (entry.isIntersecting) {
        // callback
        target?.callbackInViewPort(true, entry.target);

        if (target?.removeAfterIntersect) {
          // un observe after intersecting
          this.observer?.unobserve(entry.target);

          // remove item in watching list
          this.watching = this.watching.filter(
            (element) => element.element !== entry.target
          );
        }
      } else {
        // callback if not intersecting
        target?.callbackNotInViewPort(true, entry.target);
      }
    });
  }

  /**
   * Adds the target to our array so we can call its
   * call back when it enters the viewport
   * @param element: element to intersect
   * @param callbackInViewPort: callback when element is in viewport
   * @param callbackNotInViewPort: callback when element is not in viewport
   * @param removeAfterIntersect: remove element if element intersects after callbackInViewPortCall
   */
  addTarget(
    element: Element,
    callbackInViewPort: CallbackType,
    callbackNotInViewPort: CallbackType = null,
    removeAfterIntersect: boolean = true
  ): void {
    this.observer?.observe(element);

    this.watching.push({
      element: element,
      callbackInViewPort: callbackInViewPort,
      callbackNotInViewPort: callbackNotInViewPort,
      removeAfterIntersect: removeAfterIntersect,
    });
  }

  isSupported() {
    return this.supported;
  }
}
