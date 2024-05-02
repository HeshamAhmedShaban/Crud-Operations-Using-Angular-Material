import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator, Validators } from '@angular/forms';

@Directive({
  selector: '[appValidation]',
  standalone: true
})
export class ValidationDirective implements Validator {

  

  @Input('appValidation') appValidation!: string | RegExp;

  pattern: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.appValidation === 'required' && Validators.required(control) !== null) {
      return { 'required': true };
    }

    if (this.appValidation === 'pattern' && !this.pattern.test(control.value)) {
      return { 'pattern': true };
    }


    return null;
  }

}

