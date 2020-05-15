import { Component } from '@angular/core';
import { ControlBase, ControlsService } from 'projects/dynamic-forms/src/public-api';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  controls: ControlBase<any>[];
  form: FormGroup;
  submitted: any;
  formConfig: any;

  tempAddress = {
    lat: 12.9834958,
    lng: 77.7694789,
    title: 'Title',
    display: 'Address'
  }

  constructor(
    private controlSvc: ControlsService
  ) {
    this.form = new FormGroup({});
  }

  ngOnInit() {
    this.formConfig = environment.sampleFormConfig;
    if (!!this.formConfig) {
      this.controls = this.controlSvc.getControls(this.formConfig.controls);
    }
    this.form.valueChanges
      .subscribe(val => {
        this.submitted = val;
      });
  }

  onSave() {
    console.log(this.submitted);
    if (this.form.invalid) {
      let errorMessage = '';
      for (let c in this.form.controls) {
        for (let e in this.form.controls[c].errors) {
          errorMessage += c + " is " + e + ", ";
        }
      }
      console.log(errorMessage);
    }
  }

}
