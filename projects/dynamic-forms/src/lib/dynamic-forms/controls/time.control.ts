import { ControlBase } from './control-base';

export class TimeControl extends ControlBase<string> {
  controlType = 'time';
  displayFormat: string = null;

  constructor(options: {} = {}) {
    super(options);
    this.displayFormat = options['displayFormat'] || 'MMM DD, YYYY';
  }
}