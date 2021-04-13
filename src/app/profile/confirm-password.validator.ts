import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ConfirmPassword {
  public confirmPassword(): ValidatorFn {
    return (formGroup: FormGroup) => {
      const password = formGroup.get('password').value;
      const confirmPassword = formGroup.get('confirmPassword').value

      return password === confirmPassword ? null : { noMatch: true}
    }
  }
}
