import { Injectable } from '@angular/core';
import { ControlDescriptor } from '../controls/control';
import { TextareaControl } from '../controls/textarea.control';
import { AddressControl } from '../controls/address.control';
import { PhotosControl } from '../controls/photos.control';
import { RadioListControl } from '../controls/radio-list.control';
import { CheckboxListControl } from '../controls/checkbox-list.control';
import { InputControl } from '../controls/input.control';
import { ToggleControl } from '../controls/toggle.control';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {
  getControls(descriptors: ControlDescriptor[]) {
    let controls = descriptors.map((descriptor, index) => {

      if (descriptor.value === undefined || descriptor.value === null) {
        descriptor.value = '';
      }

      let options = {
        ...descriptor,
        controlType: descriptor.controlType,
        name: descriptor.name,
        label: descriptor.label,
        value: descriptor.value,
        order: descriptor.order
      };

      switch (descriptor.controlType) {
        case 'input':
          return new InputControl(options);
        case 'toggle':
          return new ToggleControl(options);
        case 'textarea':
          return new TextareaControl(options);
        case 'address':
          return new AddressControl(options);
        case 'photos':
          return new PhotosControl(options);
        case 'radiolist':
          return new RadioListControl(options);
        case 'checkboxlist':
          return new CheckboxListControl(options);
        default:
          console.error(`${descriptor.controlType} is not supported`);
      }
    });

    return controls.filter(x => !!x).sort((a, b) => a.order - b.order);
  }
}
