import { Component, OnInit, ChangeDetectionStrategy, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { RadioListComponent } from './radio-list/radio-list.component';
import * as _ from 'lodash';

@Component({
  selector: 'radio-list-form-control',
  templateUrl: './radio-list-form-control.component.html',
  styleUrls: ['./radio-list-form-control.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioListFormControlComponent),
    multi: true
  }]
})
export class RadioListFormControlComponent implements ControlValueAccessor {

  @Input() iconSource: string;
  @Input() control: any = {};
  @Input() isInvalid: boolean;
  @Input() isValid: boolean;

  value: any;

  constructor(private popoverController: PopoverController) { }


  async showOptions() {

    this.onTouched(null);
    this.emitChanges();

    const popover = await this.popoverController.create({
      component: RadioListComponent,
      componentProps: {
        control: this.control,
        value: this.value
      },
      translucent: true
    });

    popover.onDidDismiss().then(result => {
      if (result.role === 'ok') {
        this.value = result.data;
        this.emitChanges();
      }
    })

    return await popover.present();

  }

  valueToDisplay(value) {
    var result = value;

    _.forEach(this.control.options, (o: any) => {
      if (o.value === value) {
        result = o.text;
      }
    });

    return result;
  }

  emitChanges() {
    this.onChange(this.value);
  }

  private onChange = (_: any) => { };
  onTouched = (_: any) => { };

  writeValue(value: any): void {
    if (!!value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(): void { }

}
