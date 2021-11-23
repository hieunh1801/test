import { FormControl, ValidatorFn } from '@angular/forms';

export function minValidator(value: number): ValidatorFn {
  return (control: FormControl): { [key: string]: any } => {
    if (control.value >= value) {
      return { min: true };
    } else {
      return null;
    }
  };
}
