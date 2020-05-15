import { Component, Input, forwardRef } from '@angular/core';
import { AddressFormControlService } from './address-form-control.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

@Component({
  selector: 'address-form-control',
  templateUrl: './address-form-control.component.html',
  styleUrls: ['./address-form-control.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AddressFormControlComponent),
    multi: true
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => AddressFormControlComponent),
    multi: true
  }]
})
export class AddressFormControlComponent implements ControlValueAccessor {

  @Input() iconSource: string;
  @Input() control: any = {}

  lat: number;
  lng: number;
  pinCode: number;
  postOfficeDisplay: string;

  private addressLine: string = '';
  private postOffice: any = {}

  get AddressLine() { return this.addressLine; }
  set AddressLine(value) { this.addressLine = value; this.emitChanges(); }

  get PostOffice() { return this.postOffice; }
  set PostOffice(value) { this.postOffice = value; this.emitChanges(); }


  constructor(private addressFormControlService: AddressFormControlService) { }

  getPostOfficeList() {
    this.postOffice = {};
    this.postOfficeDisplay = null;
    if (!!this.pinCode) {
      this.addressFormControlService.getDetailsByPINCode(this.pinCode).then((office: any) => {
        this.PostOffice = office;
        this.postOfficeDisplay = office.display;
      });
    }
  }

  getOrSetLocation() {
    this.addressFormControlService.getLocation(this.lat, this.lng, "Title", this.postOfficeDisplay).then((location: any) => {
      this.lat = location.lat;
      this.lng = location.lng;
      this.emitChanges();
    });
  }

  emitChanges() {
    let value = {
      addressLine: this.addressLine,
      ...this.postOffice,
      lat: this.lat,
      lng: this.lng
    }
    console.log(value);
    this.onChange(value);
  }

  onChange = (_: any) => { };
  onTouched = (_: any) => { };

  writeValue(value: any): void {
    if (value != undefined) {
      this.addressLine = value.addressLine;
      this.postOffice = value;
      this.pinCode = value.pinCode;
      this.postOfficeDisplay = value.display;
      this.lat = value.lat;
      this.lng = value.lng;
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

    if (!!this.control.validators['isAddressLineRequired']) {
      if (!(!!control.value && !!control.value.addressLine)) {
        return { 'isaddresslinerequired': true }
      }
    }

    if (!!this.control.validators['addressLineMinLength']) {
      let minLength = this.control.validators['addressLineMinLength'].length || 1;
      if (!!control.value.addressLine && control.value.addressLine.length < minLength) {
        return { 'addresslineminlength': true }
      }
    }

    if (!!this.control.validators['addressLineMaxLength']) {
      let maxLength = this.control.validators['addressLineMaxLength'].length || 1000;
      if (!!control.value.addressLine && control.value.addressLine.length > maxLength) {
        return { 'addresslinemaxlength': true }
      }
    }

    if (!!this.control.validators['postalAddressRequired']) {
      console.log(control.value.officename)
      if (!(!!control.value && !!control.value.officename)) {
        console.log(control.value.officename)
        return { 'postaladdressrequired': true }
      }
    }

    return (null);

  }

}
