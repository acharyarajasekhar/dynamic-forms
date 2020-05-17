import { Component, OnInit, ViewChild } from '@angular/core';
import { ControlBase, ControlsService } from '@acharyarajasekhar/dynamic-forms';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.css']
})
export class SampleFormComponent implements OnInit {

  @ViewChild('dynamicForm', { static: true }) dynamicForm: any;

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
    private controlSvc: ControlsService,
    private modalController: ModalController
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

  cancel() {
    this.modalController.dismiss();
  }

  onSave() {
    console.log(this.submitted);
    if (this.form.invalid) {
      this.dynamicForm.showErrors();
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
