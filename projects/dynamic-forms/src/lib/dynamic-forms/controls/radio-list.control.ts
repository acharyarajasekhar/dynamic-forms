import { ControlBase } from './control-base';

export class RadioListControl extends ControlBase<string> {
  controlType = 'radiolist';
  options: { key: string, value: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
    this.value = options[this.value] || null;
  }
}