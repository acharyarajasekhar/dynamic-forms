import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { CheckboxListComponent } from './checkbox-list/checkbox-list.component';

@Component({
  selector: 'checkbox-list-form-control',
  templateUrl: './checkbox-list-form-control.component.html',
  styleUrls: ['./checkbox-list-form-control.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxListFormControlComponent),
    multi: true
  }]
})
export class CheckboxListFormControlComponent implements ControlValueAccessor {

  @Input() iconSource: string;
  @Input() control: any = {};

  value: any;

  constructor(private popoverController: PopoverController) { }


  async showOptions() {

    const popover = await this.popoverController.create({
      component: CheckboxListComponent,
      componentProps: {
        control: this.control,
        values: this.value || []
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

  private onChange = (_: any) => { };

  writeValue(value: any): void {
    if (value != undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(): void { }

  setDisabledState?(): void { }

}
