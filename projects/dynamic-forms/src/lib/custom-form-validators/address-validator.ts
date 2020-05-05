import { AbstractControl } from '@angular/forms';

export function addressValidator(control: AbstractControl): { [key: string]: boolean } | null {
    
    if (!!control.value) {
        if (!control.value.line || !control.value.pincode) {
            return ({ 'address': true });
        }
    }

    return (null);
}