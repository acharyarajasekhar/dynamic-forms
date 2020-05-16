import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, FormControl } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'photos-form-control',
  templateUrl: './photos-form-control.component.html',
  styleUrls: ['./photos-form-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhotosFormControlComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhotosFormControlComponent),
      multi: true
    }
  ]
})
export class PhotosFormControlComponent implements ControlValueAccessor {

  @ViewChild('fileInputElement', { static: true }) fileInputElement: any;

  @Input() iconSource: string;
  @Input() control: any = {};

  selectedFiles: Array<any> = [];

  @Input() isInvalid: boolean;
  @Input() isValid: boolean;

  constructor() { }

  onFileChange(event) {
    if (!!this.fileInputElement.nativeElement.value) {
      this.selectedFiles = [];
      _.forEach(event.target.files, (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = event => {
          this.selectedFiles.push(reader.result);
          this.emitChanges();
        };
      })
    }
  }

  clear() {
    this.selectedFiles = [];
    this.emitChanges();
  }

  emitChanges() {
    this.onChange(this.selectedFiles);
  }

  onChange = (_: any) => { };
  onTouched = (_: any) => { };

  writeValue(value: any): void {
    if (value != undefined) {
      this.selectedFiles = value;
    }
    console.log(this.control)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(): void { }

  validate(control: FormControl) {

    if (!!control.untouched) return;

    if (!!this.control.validators['isRequired']) {
      if (!!!this.selectedFiles || this.selectedFiles.length === 0) {
        return { 'isrequired': true }
      }
    }

    if (!!this.control.validators['maxAllowed']) {
      let maxAllowed = this.control.validators['maxAllowed'].value || 1;
      if (!!this.selectedFiles && this.selectedFiles.length > 0 && this.selectedFiles.length > maxAllowed) {
        return { 'maxallowed': true }
      }
    }

    return (null);

  }

}
