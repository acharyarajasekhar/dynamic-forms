import { ControlBase } from './control-base';
/*
{
  "required": true,
  "type": "text",
  "order": 0,
  "title": "Temple Name",
  "name": "name"
}
*/
export class TextboxControl extends ControlBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}