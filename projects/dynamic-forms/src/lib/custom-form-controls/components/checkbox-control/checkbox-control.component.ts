import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlComponent } from '../base-control.component';

@Component({
    selector: 'checkbox-control',
    templateUrl: './checkbox-control.component.html',
    styleUrls: ['./checkbox-control.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxControlComponent),
        multi: true
    }]
})
export class CheckboxControlComponent extends BaseControlComponent {

    @Input() icon: string;
    @Input() placeholder: string;
    @Input() description: string;
    @Input() controlSeparator: boolean;

    onSelection(event: { detail: { value: any, checked: boolean }; }) {
        if (!!event && !!event.detail) {
            this.onChange(event.detail.checked);
        }
    }

}
