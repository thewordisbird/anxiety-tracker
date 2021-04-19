import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export function formChipFieldValidator(chipCount: number, parentStatus: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const inValid = parentStatus && chipCount === 0
    return inValid ? {inValid: true} : null
  }
}
