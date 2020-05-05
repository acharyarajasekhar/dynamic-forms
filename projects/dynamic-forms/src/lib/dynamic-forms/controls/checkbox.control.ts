import { ControlBase } from './control-base';
/*
{
  "required": true,
  "type": "checkbox",
  "order": 0,
  "title": "isPublicProfile",
  "name": "isPublicProfile"
}
*/
export class CheckboxControl extends ControlBase<boolean> {
  controlType = 'checkbox';
  description: string;
  controlSeparator: boolean = false;

  constructor(options: {} = {}) {
    super(options);
    this.description = options['description'] || null;
    this.controlSeparator = options['controlSeparator'] || false;
  }
}