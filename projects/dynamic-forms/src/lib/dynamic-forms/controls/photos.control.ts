import { ControlBase } from './control-base';

export class PhotosControl extends ControlBase<string> {
  controlType = 'photos';
  multiple: boolean = false;
  accept: string = "";

  constructor(options: {} = {}) {
    super(options);
    this.multiple = options['multiple'] || false;
    this.accept = options['accept'] || '';
  }
}