import { ControlBase } from './control-base';
/*
{
  "title": "Temple Description",
  "name": "description",
  "required": true,
  "type": "textarea",
  "order": 1
}
*/
export class TextareaControl extends ControlBase<string> {
  controlType = 'textarea';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}