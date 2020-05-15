import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { ControlBase } from '../controls/control-base';

@Injectable({
  providedIn: 'root'
})
export class DynamicControlsService {
  toFormGroup(formGroup: FormGroup, controls: ControlBase<any>[]) {

    formGroup = formGroup || new FormGroup({});

    controls.forEach(control => {

      let validatorFns: ValidatorFn[] = [];

      if (!!control.validators) {
        if (!!control.validators.required) {
          validatorFns.push(Validators.required);
        }
        if (!!control.validators.minLength) {
          validatorFns.push(Validators.minLength(control.validators.minLength.length));
        }
        if (!!control.validators.maxLength) {
          validatorFns.push(Validators.maxLength(control.validators.maxLength.length));
        }
        if (!!control.validators.pattern) {
          validatorFns.push(Validators.pattern(control.validators.pattern.regEx));
        }
        if (!!control.validators.email) {
          validatorFns.push(Validators.email);
        }
        if (!!control.validators.min) {
          validatorFns.push(Validators.min(control.validators.min.min));
        }
      }

      let formControl = new FormControl(control.value, { validators: validatorFns });
      formGroup.addControl(control.name, formControl);
    });

    return formGroup;

  }
}
