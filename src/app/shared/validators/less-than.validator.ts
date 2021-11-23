import { FormControl, ValidatorFn } from '@angular/forms';

export function lessThan(value: number): ValidatorFn {
  return (control: FormControl): { [key: string]: any } => {
    if (control.value > value) {
      return { min: true, value: value };
    } else {
      return null;
    }
  };
}
