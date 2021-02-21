import { AbstractControl } from '@angular/forms';

export function PasswordValidator(control: AbstractControl): { [key: string]: boolean } | false {
  const password = control.get('password'); // get from control
  const confirmPassword = control.get('confirmPassword'); // same as above

  if (password.pristine || confirmPassword.pristine) {
    return false;
  }

  return password && confirmPassword && password.value !== confirmPassword.value ?
  {'misMatch' : true} : false;
}
