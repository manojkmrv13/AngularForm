import { AbstractControl } from '@angular/forms';

export function AgeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  let today = new Date().getFullYear();
  if(control.value!=null){
  let year = control.value.year;
  if (today-year < 18) {
    return { 'age': true };
  }
  return null;
}
}
