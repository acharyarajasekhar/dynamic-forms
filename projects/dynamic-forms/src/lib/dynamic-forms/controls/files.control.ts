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
export class FilesControl extends ControlBase<string> {
  controlType = 'files';
  multiple: boolean = false;
  accept: string = "";

  constructor(options: {} = {}) {
    super(options);
    this.multiple = options['multiple'] || false;
    this.accept = options['accept'] || '';
    this.value = options[this.value] || null;
  }
}