import { Component } from '@angular/core';
import { ControlBase, ControlsService } from 'projects/dynamic-forms/src/public-api';
import { FormGroup } from '@angular/forms';

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
    this.formConfig = formConfig;
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

const formConfig = {
  "controls": [
    {
      "order": 0,
      "name": "name",
      "type": "text",
      "icon": "temple",
      "title": "Full Name",
      "validators": {
        required: { message: "Temple Name is required" },
        minLength: { length: 5, message: "Temple Name must be at least 5 characters long" },
        maxLength: { length: 50, message: "Temple Name cannot be more than 50 characters long" },
        pattern: { regEx: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$", message: 'Temple Name must contain only letters' }
      }
    },
    {
      "order": 1,
      "name": "description",
      "type": "textarea",
      "icon": "details",
      "title": "Brief description about roles and responsibilities",
      "validators": {
        required: { message: "Description is required" },
        minLength: { length: 10, message: "Description must be at least 10 characters long" },
        maxLength: { length: 5000, message: "Description cannot be more than 5000 characters long" }
      }
    },
    {
      "order": 1,
      "icon": "details",
      "title": "Choose Cover Photos",
      "name": "photos",
      "type": "photos",
      "multiple": true,
      "accept": ".png, .jpg, .jpeg",
      "max": 5,
      "validators": null
    },
    {
      "type": "currency",
      "icon": "rupee",
      "title": "Monthly Salary",
      "currencytypes": [
        "₹",
        "$"
      ],
      "defaultCurrencyType": "₹",
      "order": 2,
      "name": "salary",
      "validators": {
        required: { message: "Monthly Salary is required" },
        min: { min: 0, message: "Monthly Salary  must be greater than 0" }
      }
    },
    {
      "type": "radiolist",
      "icon": "supplyfree",
      "title": "Do you provide",
      "options": [
        "Accommodation",
        "LPG",
        "Rice",
        "Vegetables",
        "Milk"
      ],
      "order": 3,
      "value": null,
      "name": "additionals1",
      "validators": null
    },
    {
      "type": "checkboxlist",
      "icon": "supplyfree",
      "title": "Do you provide",
      "options": [
        "Accommodation",
        "LPG",
        "Rice",
        "Vegetables",
        "Milk"
      ],
      "value": null,
      "order": 3,
      "name": "additionals",
      "validators": null
    },
    {
      "type": "text",
      "icon": "avatar",
      "title": "Contact Person",
      "order": 4,
      "name": "contactPerson",
      "validators": {
        required: { message: "Contact Person Name is required" },
        minLength: { length: 5, message: "Contact Person Name must be at least 5 characters long" },
        maxLength: { length: 50, message: "Contact Person Name cannot be more than 25 characters long" },
        pattern: { regEx: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$", message: 'Contact Person Name must contain only letters' }
      }
    },
    {
      "type": "number",
      "icon": "call",
      "title": "Contact Number",
      "order": 5,
      "name": "contactNumber",
      "validators": {
        required: { message: "Contact Number is required" }
        // pattern: { regEx: "^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$", message: 'Invalid contact number' }
      }
    },
    {
      "type": "email",
      "icon": "mail",
      "title": "Contact Email",
      "order": 6,
      "name": "contactEmail",
      "validators": {
        required: { message: "Contact Email is required" },
        email: { message: "Invalid email id" }
      }
    },
    {
      "type": "date",
      "icon": "date",
      "title": "Date",
      "order": 7,
      "name": "date",
      "validators": {
        required: { message: "Date is required" }
      }
    },
    {
      "type": "time",
      "icon": "time",
      "title": "Time",
      "order": 7,
      "name": "time",
      "validators": {
        required: { message: "Time is required" }
      }
    },
    {
      "type": "datetime",
      "icon": "date",
      "title": "DateTime",
      "order": 7,
      "name": "datetime",
      "validators": {
        required: { message: "DateTime is required" }
      }
    },
    {
      "order": 8,
      "title": "Temple Address",
      "name": "address",
      "type": "address",
      "icon": "postoffice",
      "validators": {
        required: { message: "Address is required" },
        address: { message: "Incomplete address details" }
      }
    }
  ]
};
