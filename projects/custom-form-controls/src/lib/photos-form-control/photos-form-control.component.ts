import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'photos-form-control',
  templateUrl: './photos-form-control.component.html',
  styleUrls: ['./photos-form-control.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PhotosFormControlComponent),
    multi: true
  }]
})
export class PhotosFormControlComponent implements ControlValueAccessor {

  @Input() iconSource: string;
  @Input() control: any = {};

  selectedFiles: Array<any> = [];

  constructor() { }

  onFileChange(event) {
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

  emitChanges() {
    this.onChange(this.selectedFiles);
  }

  private onChange = (_: any) => { };

  writeValue(value: any): void {
    if (value != undefined) {
      this.selectedFiles = value;
    }
    console.log(this.control)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(): void { }

  setDisabledState?(): void { }

}
