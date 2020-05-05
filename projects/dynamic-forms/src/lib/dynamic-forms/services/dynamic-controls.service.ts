import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { ControlBase } from '../controls/control-base';
// import { addressValidator } from '../../custom-form-validators/address-validator';
// import { dobValidator } from '../../custom-form-validators/dob-validator';
// import { dateRangeValidator } from '../../custom-form-validators/date-range-validator';
// import { templeTimingsValidator } from '../../custom-form-validators/temple-timings-validator';

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
        // if (!!control.validators.address) {
        //   validatorFns.push(addressValidator);
        // }
        // if (!!control.validators.dob) {
        //   validatorFns.push(dobValidator(control.validators.dob.min, control.validators.dob.max));
        // }
        // if (!!control.validators.dateRange) {
        //   validatorFns.push(dateRangeValidator);
        // }
        // if (!!control.validators.templeTimings) {
        //   validatorFns.push(templeTimingsValidator);
        // }
        // if (!!control.validators.improperTempleTimings) {
        //   validatorFns.push(templeTimingsValidator);
        // }
      }

      let formControl = new FormControl(control.value, { validators: validatorFns });
      formGroup.addControl(control.name, formControl);
    });

    return formGroup;

  }
}
