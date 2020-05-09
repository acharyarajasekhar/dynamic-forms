import { ControlBase } from './control-base';

export class PhotosControl extends ControlBase<string> {
  controlType = 'photos';
  max = 1;
  defaultPhoto: string;
  multiple: boolean = false;
  accept: string = "";

  constructor(options: {} = {}) {
    super(options);
    this.max = options['max'];
    this.defaultPhoto = options['defaultPhoto'];
    this.multiple = options['multiple'] || false;
    this.accept = options['accept'] || '';
  }
}