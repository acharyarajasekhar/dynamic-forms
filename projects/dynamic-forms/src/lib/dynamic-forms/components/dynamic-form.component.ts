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

  displayErrors: boolean = false;

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

    this.form = this.controlsService.toFormGroup(this.form, this.controls);
  }

  private handleUndefined = (obj) => {
    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === 'object') this.handleUndefined(obj[key]);
      else if (obj[key] === undefined) obj[key] = null;
    });
    return obj;
  };

  onSubmit() {
    let data = Object.assign({}, this.form.value);
    this.handleUndefined(data);
    this.submit.next(data);
  }

  showErrors() {
    this.displayErrors = true;
  }
}
