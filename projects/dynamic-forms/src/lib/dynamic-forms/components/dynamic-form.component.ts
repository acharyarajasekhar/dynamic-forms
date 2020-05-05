import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlBase } from '../controls/control-base';
import { DynamicControlsService } from '../services/dynamic-controls.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @Input() svgIconBasePath: string = '';
  @Input() controls: ControlBase<any>[] = [];
  @Input() form: FormGroup;
  @Output() submit: EventEmitter<any> = new EventEmitter();

  displayErrors: boolean = true;

  constructor(
    private controlsService: DynamicControlsService
  ) { }

  ngOnInit() {
    this.controls.forEach(control => {
      control['validations'] = [];
      for (var key in control.validators) {
        if (control.validators.hasOwnProperty(key)) {
          control['validations'].push({
            'type': key.toLowerCase(),
            'message': control.validators[key].message
          });
        }
      }
    });

console.log(this.controls);

    this.form = this.controlsService.toFormGroup(this.form, this.controls);
  }

  onSubmit() {
    this.submit.next(this.form.value);
  }

  showErrors() {
    this.displayErrors = true;
    let errorMessage = '';
    for (let c in this.form.controls) {
      for (let e in this.form.controls[c].errors) {
        errorMessage += c + " is " + e + ", ";
      }
    }
  }

  onIonChange(event, control) {
    console.log(event);
    if (event && event.detail && event.detail.value) {
      //control.value = event.detail.value;
    }
  }

}
