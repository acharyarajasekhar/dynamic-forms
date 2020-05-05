import { ControlBase } from './control-base';
/*
{
  "required": true,
  "type": "email",
  "order": 0,
  "title": "Email Address",
  "name": "email"
}
*/
export class EmailControl extends ControlBase<string> {
  controlType = 'email';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}