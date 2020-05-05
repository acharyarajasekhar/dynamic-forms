import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-base-control',
  template: 'NO UI TO BE FOUND HERE!',
  styles: []
})
export class BaseControlComponent implements ControlValueAccessor {

  value: any;

  protected onChange: Function = (value: any) => { };

  onSelection(event: { detail: { value: any, checked: boolean }; }) {
    if (event && event.detail && event.detail.value) {
      this.onChange(event.detail.value);
    }
  }

  // Allow Angular to set the value on the component
  writeValue(value: any): void {
    this.value = value;
  }

  // Save a reference to the change function passed to us by
  // the Angular form control
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Save a reference to the touched function passed to us by
  // the Angular form control
  registerOnTouched(): void { }

  // Allow the Angular form control to disable this input
  setDisabledState?(): void { }

}
