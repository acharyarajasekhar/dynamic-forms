import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dobValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (!!control.value) {
            try {
                const bdate = new Date(control.value);
                const timeDiff = Math.abs(Date.now() - bdate.getTime());
                const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);

                if (isNaN(age) || age < min || age > max) {
                    return ({ 'dob': true });
                }
            }
            catch (e) {
                return ({ 'dob': true });
            }
        }

        return (null);
    };
}