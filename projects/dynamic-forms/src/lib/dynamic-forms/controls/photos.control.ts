import { ControlBase } from './control-base';

export class PhotosControl extends ControlBase<string> {
  controlType = 'photos';
  max = 1;
  defaultPhoto: string;

  constructor(options: {} = {}) {
    super(options);
    this.max = options['max'];
    this.defaultPhoto = options['defaultPhoto'];
  }
}