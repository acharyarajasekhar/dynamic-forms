import { ControlBase } from './control-base';

export class RadioListControl extends ControlBase<string> {
  
  options: { value: string, text: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}