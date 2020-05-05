import { ControlBase } from './control-base';

/*
        {
            "title": "Monthly Salary",
            "order": 3,
            "unit": "₹",
            "step": 500,
            "type": "range",
            "max": 100000,
            "maxtitle": "100K",
            "min": 3000,
            "unitposition": "prefix",
            "name": "salary",
            "mintitle": "3k",
            "required": true
        }   
*/

export class RangeControl extends ControlBase<string> {
  controlType = 'range';
  min = 0;
  max = 0;
  step = 0;
  unit = '';
  unitposition = 'prefix';
  mintitle = '';
  maxtitle = '';

  constructor(options: {} = {}) {
    super(options);
    this.min = options['min'];
    this.max = options['max'];
    this.step = options['step'];
    this.unit = options['unit'];
    this.unitposition = options['unitposition'];
    this.mintitle = options['mintitle'];
    this.maxtitle = options['maxtitle'];
  }
}