import { ControlBase } from './control-base';

export class DateTimeControl extends ControlBase<string> {
  controlType = 'datetime';
  displayFormat: string = null;

  constructor(options: {} = {}) {
    super(options);
    this.displayFormat = options['displayFormat'] || 'MMM DD, YYYY';
  }
}