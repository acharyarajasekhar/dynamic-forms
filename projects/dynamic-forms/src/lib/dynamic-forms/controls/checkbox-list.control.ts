import { ControlBase } from './control-base';

export class CheckboxListControl extends ControlBase<string> {
  controlType = 'checkboxlist';
  options: { key: string, value: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
    this.value = options[this.value] || null;
  }
}