import { ControlBase } from './control-base';

export class DateRangeTimeControl extends ControlBase<string> {
    controlType = 'daterange';
    displayFormat: string = null;

    constructor(options: {} = {}) {
        super(options);
        this.displayFormat = options['displayFormat'] || 'MMM DD, YYYY';
    }
}