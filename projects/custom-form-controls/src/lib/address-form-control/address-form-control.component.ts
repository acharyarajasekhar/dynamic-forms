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

  pinCode: number;
  postOfficeDisplay: string;

  private addressLine: string = '';
  private postOffice: any = {}

  get AddressLine() { return this.addressLine; }
  set AddressLine(value) { this.addressLine = value; this.emitChanges(); }

  get PostOffice() { return this.postOffice; }
  set PostOffice(value) { this.postOffice = value; this.emitChanges(); }


  constructor(private postAddressService: AddressFormControlService) { }

  getPostOfficeList() {
    this.postOffice = {};
    this.postOfficeDisplay = null;
    if (!!this.pinCode) {
      this.postAddressService.getDetailsByPINCode(this.pinCode).then((office: any) => {
        this.PostOffice = office;
        this.postOfficeDisplay = office.display;
      });
    }
  }

  emitChanges() {
    let value = {
      addressLine: this.addressLine,
      ...this.postOffice
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
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(): void { }

  setDisabledState?(): void { }

}
