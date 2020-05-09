import { Component, Input, forwardRef } from '@angular/core';
import { AddressFormControlService } from './address-form-control.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'address-form-control',
  templateUrl: './address-form-control.component.html',
  styleUrls: ['./address-form-control.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AddressFormControlComponent),
    multi: true
  }]
})
export class AddressFormControlComponent implements ControlValueAccessor {

  @Input() iconSource: string;

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

  private onChange = (_: any) => { };

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

  registerOnTouched(): void { }

  setDisabledState?(): void { }

}
