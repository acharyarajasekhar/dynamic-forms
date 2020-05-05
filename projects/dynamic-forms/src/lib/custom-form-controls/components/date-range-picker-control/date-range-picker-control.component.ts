import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlComponent } from '../base-control.component';
import { DatePickerService } from 'src/app/native/date-picker.service';
import * as moment from 'moment';

@Component({
  selector: 'date-range-picker-control',
  templateUrl: './date-range-picker-control.component.html',
  styleUrls: ['./date-range-picker-control.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateRangePickerControlComponent),
    multi: true
  }]
})
export class DateRangePickerControlComponent extends BaseControlComponent {

  @Input() icon: string;
  @Input() placeholder: string;
  @Input() displayFormat: string = "MMM DD, YYYY";

  private start: any;
  private end: any;

  get startDttm() { return this.start; }
  get endDttm() { return this.end; }

  set startDttm(val) { this.start = val; this.onDttmChange(); }
  set endDttm(val) { this.end = val; this.onDttmChange(); }

  constructor(
    private datePickerSvc: DatePickerService,
  ) { super() }

  async openStartDatePicker() {

    try {
      let dttm = await this.datePickerSvc.datePicker.show({
        date: new Date(this.startDttm || new Date()),
        mode: 'datetime',
        androidTheme: this.datePickerSvc.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
      });

      this.startDttm = moment(dttm).format('MMM DD YYYY hh:mm a');

    }
    catch (err) {
      console.log(err);
    }

  }

  async openEndDatePicker() {

    try {
      let dttm = await this.datePickerSvc.datePicker.show({
        date: new Date(this.endDttm || new Date()),
        mode: 'datetime',
        androidTheme: this.datePickerSvc.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK
      });

      this.endDttm = moment(dttm).format('MMM DD YYYY hh:mm a');

    }
    catch (err) {
      console.log(err);
    }

  }

  onDttmChange() {
    let dttm = {
      startDttm: !!this.startDttm ? new Date(this.startDttm) : null,
      endDttm: !!this.endDttm ? new Date(this.endDttm) : null,
    }
    this.onChange(dttm)
  }

  onStartChange(event: { detail: { value: any, checked: boolean }; }) {
    if (event && event.detail && event.detail.value) {
      this.startDttm = event.detail.value;
    }
  }

  onEndChange(event: { detail: { value: any, checked: boolean }; }) {
    if (event && event.detail && event.detail.value) {
      this.endDttm = event.detail.value;
    }
  }

  // Allow Angular to set the value on the component
  writeValue(value: any): void {
    if (!!value) {
      this.startDttm = !!value.startDttm ? moment(value.startDttm.toDate()).format('MMM DD YYYY hh:mm a') : null;
      this.endDttm = !!value.endDttm ? moment(value.endDttm.toDate()).format('MMM DD YYYY hh:mm a') : null;
    }
  }

}
