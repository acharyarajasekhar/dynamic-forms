import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, FormControl } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { CheckboxListComponent } from './checkbox-list/checkbox-list.component';

@Component({
  selector: 'checkbox-list-form-control',
  templateUrl: './checkbox-list-form-control.component.html',
  styleUrls: ['./checkbox-list-form-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxListFormControlComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CheckboxListFormControlComponent),
      multi: true
    }
  ]
})
export class CheckboxListFormControlComponent implements ControlValueAccessor {

  @Input() iconSource: string;
  @Input() control: any = {};
  @Input() isInvalid: boolean;
  @Input() isValid: boolean;

  value: any = [];

  constructor(private popoverController: PopoverController) { }

  async showOptions() {

    this.onTouched(null);
    this.emitChanges();

    const popover = await this.popoverController.create({
      component: CheckboxListComponent,
      componentProps: {
        control: this.control,
        values: this.value
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

  emitChanges() {
    this.onChange(this.value);
  }

  onChange = (_: any) => { };
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

  validate(control: FormControl) {

    if (!!control.untouched) return;

    if (!!this.value) {

      if (!!this.control.validators['minRequired']) {
        let minRequired = this.control.validators['minRequired'].count || 1;
        if (this.value.length < minRequired) {
          return { 'minrequired': true }
        }
      }

      if (!!this.control.validators['maxAllowed']) {
        let maxAllowed = this.control.validators['maxAllowed'].count || 1;
        if (this.value.length > maxAllowed) {
          return { 'maxallowed': true }
        }
      }
    }

    return (null);

  }

}
