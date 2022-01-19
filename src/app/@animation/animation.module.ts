import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateAfterAppearDirective } from './directives/animate-after-appear.directive';
import {
  IntersectionObserverService,
  IntersectionObserverServiceConfig,
} from './services/intersection-observer.service';

@NgModule({
  declarations: [AnimateAfterAppearDirective],
  exports: [AnimateAfterAppearDirective],
  providers: [IntersectionObserverService],
  imports: [CommonModule],
})
export class AnimationModule {
  constructor(@Optional() @SkipSelf() parentModule: AnimationModule) {
    console.log('Animation Module');
    if (parentModule) {
      // throw new Error(
      //   'AnimationModule is already loaded. Import it in the AppModule only'
      // );
    }
  }

  public static forRoot(
    config?: IntersectionObserverServiceConfig
  ): ModuleWithProviders<any> {
    return {
      ngModule: AnimationModule,
      providers: [
        {
          provide: IntersectionObserverServiceConfig,
          useValue: config,
        },
      ],
    };
  }
}
