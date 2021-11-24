import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'genderToString',
})
export class GenderToStringPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: unknown, ...args: unknown[]): unknown {
    let result: string = null;
    switch (value) {
      case 1:
        result = this.translateService.instant('GENDER__MALE');
        break;
      case -1:
        result = this.translateService.instant('GENDER__FEMALE');
        break;
      default:
        result = this.translateService.instant('GENDER__OTHER');
    }
    return result;
  }
}
