import { Component, forwardRef, Input, ViewChildren } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { Platform } from '@ionic/angular';
import { PhotosFormControlService } from './photos-form-control.service';

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

  @ViewChildren('fileInputElement') fileInputElement: any;

  @Input() iconSource: string;
  @Input() control: any = {};

  selectedFiles: Array<any> = [];

  @Input() isInvalid: boolean;
  @Input() isValid: boolean;

  currentPlatform: string = 'browser';

  constructor(
    private platform: Platform,
    private photosFormControlService: PhotosFormControlService
  ) {

    if (this.platform.is('ios') || this.platform.is('android')) {
      this.currentPlatform = 'mobile';
    }
    else {
      this.currentPlatform = 'browser';
    }

  }

  onFileChange(event) {

    if (!!this.fileInputElement.first.nativeElement.value) {
      this.selectedFiles = [];
      this.photosFormControlService.handleImageSelection(event).then((files: []) => {
        this.selectedFiles = files;
      })
    }

  }

  async pickImage() {

    this.selectedFiles = [];

    let maxAllowed = 1;

    if (!!this.control.validators['maxAllowed']) {
      maxAllowed = this.control.validators['maxAllowed'].count || 1;
    }

    this.photosFormControlService.selectPhoto(maxAllowed, false).then((files: []) => {
      this.selectedFiles = files;
    });

  }

  clear() {
    if (!!this.fileInputElement && !!this.fileInputElement.first) {
      this.fileInputElement.first.nativeElement.value = '';
    }
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
