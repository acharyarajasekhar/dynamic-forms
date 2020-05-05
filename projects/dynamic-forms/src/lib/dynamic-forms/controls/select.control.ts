import { ControlBase } from './control-base';
/*
        {
            "options": [
                "Not Provided",
                "Single Room",
                "One BHK",
                "Two BHK",
                "Three BHK"
            ],
            "order": 4,
            "name": "accommodation",
            "type": "select",
            "required": true,
            "title": "Accommodation"
        }
*/
export class SelectControl extends ControlBase<string> {
  controlType = 'select';
  options: { key: string, value: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}