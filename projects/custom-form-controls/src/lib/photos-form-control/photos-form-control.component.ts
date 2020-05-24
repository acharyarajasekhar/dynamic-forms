import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { BusyIndicatorService } from '@acharyarajasekhar/busy-indicator';

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

  constructor(private busy: BusyIndicatorService) { }

  onFileChange(event) {

    if (!!this.fileInputElement.nativeElement.value) {
      this.selectedFiles = [];
      let promises = [];

      this.busy.show();

      _.forEach(event.target.files, (file) => {

        let promise = new Promise((res) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = event => {
            this.selectedFiles.push(reader.result);
            this.emitChanges();
            res();
          };
        })

        promises.push(promise);

      })

      Promise.all(promises).then(() => {
        this.busy.hide();
      })
    }
  }

  clear() {
    this.fileInputElement.nativeElement.value = '';
    this.selectedFiles = [];
    this.emitChanges();
  }

  emitChanges() {
    if (this.control.multiple === true) {
      this.onChange(this.selectedFiles);
    }
    else {
      this.onChange(this.selectedFiles[0]);
    }
  }

  onChange = (_: any) => { };
  onTouched = (_: any) => { };

  writeValue(value: any): void {
    if (!!value) {
      if (this.control.multiple === true) {
        this.selectedFiles = value;
      }
      else {
        this.selectedFiles = [value];
      }
    }
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

    if (!!control.value) {

      if (!!this.control.validators['minRequired']) {
        let minRequired = this.control.validators['minRequired'].count || 1;
        if (control.value.length < minRequired) {
          return { 'minrequired': true }
        }
      }

      if (!!this.control.validators['maxAllowed']) {
        let maxAllowed = this.control.validators['maxAllowed'].count || 1;
        if (control.value.length > maxAllowed) {
          return { 'maxallowed': true }
        }
      }

    }

    return (null);

  }

}
