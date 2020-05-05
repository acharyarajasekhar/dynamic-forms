export class ControlBase<T> {
  value: T;
  name: string;
  label: string;
  order: number;
  controlType: string;
  icon: string;
  validators: any;

  constructor(options: {
    value?: T,
    name?: string,
    label?: string,
    order?: number,
    controlType?: string,
    icon?: string,
    validators?: any
  } = {}) {
    this.value = options.value;
    this.name = options.name || '';
    this.label = options.label || '';
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.icon = options.icon || '';
    this.validators = options.validators || null;
  }
}