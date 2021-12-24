import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { JoyrideService, JoyrideStepService } from 'ngx-joyride';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebGuideService {
  isRunning$ = new BehaviorSubject<boolean>(false);

  get running() {
    return this.isRunning$.value;
  }

  constructor(
    private joyrideService: JoyrideService,
    private translateService: TranslateService,
    private joyrideStepService: JoyrideStepService
  ) {}

  /**
   *
   * @param steps
   * @param showCounter
   */
  startTour(
    steps: string[],
    showCounter: boolean = false,
    startWith: string = steps[0]
  ): void {
    this.isRunning$.next(true);
    console.log('tours', steps);
    this.joyrideService
      .startTour({
        steps: steps,
        showCounter: showCounter,
        customTexts: {
          close: this.translateService.instant('JOYRIDE__BUTTONS__CLOSE'),
          done: this.translateService.instant('JOYRIDE__BUTTONS__DONE'),
          next: this.translateService.instant('JOYRIDE__BUTTONS__NEXT'),
          prev: this.translateService.instant('JOYRIDE__BUTTONS__PREV'),
        },
        themeColor: '#003f9e',
        stepDefaultPosition: 'bottom',
        startWith: startWith,
      })
      .subscribe(
        (step) => {
          const currentStepIndex = step.number;
          const currentStep = document.querySelector(
            `[joyridestep='${step.name}']`
          );

          if (!currentStep) {
            this.joyrideStepService.next();
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.isRunning$.next(false);
        }
      );
  }
}
