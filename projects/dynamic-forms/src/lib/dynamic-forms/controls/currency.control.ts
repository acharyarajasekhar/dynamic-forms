import { ControlBase } from './control-base';

/*
{
    "currencytypes": [
        "₹",
        "$"
    ],
    "defaultCurrencyType": "₹",
    "name": "salary",
    "type": "currency",
    "title": "Monthly Salary",
    "order": 3,
    "required": true    
}
*/

export class CurrencyControl extends ControlBase<string> {
    controlType = 'currency';
    currencytypes = [];
    defaultCurrencyType = '';

    constructor(options: {} = {}) {
        super(options);
        this.currencytypes = options['currencytypes'];
        this.defaultCurrencyType = options['defaultCurrencyType'];
    }

    getSelectCurrencyTypeControlName() {
        return this.name + "_currecy_type";
    }
}