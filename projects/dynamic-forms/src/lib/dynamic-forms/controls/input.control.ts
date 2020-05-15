import { ControlBase } from './control-base';

export class InputControl extends ControlBase<string> {

    inputType: string;
    options: any = {};

    constructor(options: {} = {}) {
        super(options);
        this.inputType = options['inputType'];
        this.options = options;
    }

}