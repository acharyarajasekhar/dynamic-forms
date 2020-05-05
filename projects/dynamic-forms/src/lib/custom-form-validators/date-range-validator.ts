import { AbstractControl } from '@angular/forms';

export function dateRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {

    if (!!control.value) {
        if (!!control.value.startDttm && !!control.value.endDttm && (control.value.startDttm <= control.value.endDttm)) {
            return (null);
        }
        return ({ 'daterange': true });
    }
    return (null);
    
}