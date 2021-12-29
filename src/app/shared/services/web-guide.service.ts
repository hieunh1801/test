import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { JoyrideService, JoyrideStepService } from 'ngx-joyride';
import { JoyrideStepInfo } from 'ngx-joyride/lib/models/joyride-step-info.class';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebGuideService {
  running$ = new BehaviorSubject<boolean>(false);
  currentStep$ = new BehaviorSubject<JoyrideStepInfo>(null);
  guideName$ = new BehaviorSubject<WebGuides>(null);
  steps$ = new BehaviorSubject<string[]>(null);

  get running(): boolean {
    return this.running$.value;
  }

  get currentStep(): JoyrideStepInfo {
    return this.currentStep$.value;
  }

  get guideName(): WebGuides {
    return this.guideName$.value;
  }

  get steps(): string[] {
    return this.steps$.value;
  }

  constructor(
    private joyrideService: JoyrideService,
    private translateService: TranslateService,
    private joyrideStepService: JoyrideStepService
  ) {}

  /**
   * Start tour guide
   * @param options - guideName: name of guide
   * @param options - steps: steps
   * @param options - showCounter: show counter
   * @param options - startWith: start with option name
   * @param options - callbackOnSuccess: callback on success
   * @param options - callbackOnError: callback on error
   */
  startTour(options: {
    guideName: WebGuides;
    steps: string[];
    showCounter?: boolean;
    startWith?: string;
    callbackOnSuccess?: Function;
    callbackOnError?: Function;
  }): void {
    const {
      guideName,
      steps,
      showCounter = false,
      startWith = steps[0],
      callbackOnSuccess,
      callbackOnError,
    } = options;

    this.guideName$.next(guideName);
    this.steps$.next(steps);
    this.running$.next(true);

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
          // skip current step
          const currentStep: any =
            document.querySelector(`[joyridestep='${step.name}']`) ||
            document.querySelector(`[webguidestep='${step.name}']`);
          const isValid = currentStep && currentStep.style.display !== 'none';
          if (!isValid) {
            this.joyrideStepService.next();
          }
        },
        (error) => {
          if (callbackOnError) {
            callbackOnError();
          }
        },
        () => {
          this.running$.next(false);
          this.guideName$.next(null);
          this.steps$.next(null);

          if (callbackOnSuccess) {
            callbackOnSuccess();
          }
        }
      );
  }
}

export enum WebGuides {
  SUMMARY_REPORT_GUIDE = 'SUMMARY_REPORT_GUIDE',
  USER_PROFILE_GUIDE = 'USER_PROFILE_GUIDE',
}
