import { ControlBase } from './control-base';

export class AddressControl extends ControlBase<any> {
  controlType = 'address';
  controlSeparator: boolean = false;

  constructor(options: {} = {}) {
    super(options);
    this.controlSeparator = options['controlSeparator'] || false;
  }
}