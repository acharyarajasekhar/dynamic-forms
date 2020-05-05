import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlComponent } from '../base-control.component';
import { DatePickerService } from 'src/app/native/date-picker.service';
import * as moment from 'moment';

@Component({
  selector: 'date-picker-control',
  templateUrl: './date-picker-control.component.html',
  styleUrls: ['./date-picker-control.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerControlComponent),
    multi: true
  }]
})
export class DatePickerControlComponent extends BaseControlComponent {

  @Input() icon: string;
  @Input() placeholder: string;
  @Input() displayFormat: string = "MMM DD, YYYY";

  constructor(
    private datePickerSvc: DatePickerService,
  ) { super() }

  async openDatePicker() {

    try {
      let dttm = await this.datePickerSvc.datePicker.show({
        date: new Date(this.value || new Date()),
        mode: 'date',
        androidTheme: this.datePickerSvc.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
      });

      this.value = moment(dttm).format('MMM DD YYYY');
    }
    catch (err) {
      console.log(err);
    }
    
  }

}
