import { ControlBase } from './control-base';

export class DateControl extends ControlBase<string> {
  controlType = 'date';
  displayFormat: string = null;

  constructor(options: {} = {}) {
    super(options);
    this.displayFormat = options['displayFormat'] || 'MMM DD, YYYY';
  }
}