import { Injectable } from '@angular/core';
import { ControlDescriptor } from '../controls/control';
import { TextboxControl } from '../controls/textbox.control';
import { TextareaControl } from '../controls/textarea.control';
import { SelectControl } from '../controls/select.control';
import { RangeControl } from '../controls/range.control';
import { CurrencyControl } from '../controls/currency.control';
import { AddressControl } from '../controls/address.control';
import { DateTimeControl } from '../controls/datetime.control';
import { PhotosControl } from '../controls/photos.control';
import { EmailControl } from '../controls/email.control';
import { TempleTimingsControl } from '../controls/temple.timings.control';
import { CheckboxControl } from '../controls/checkbox.control';
import { DateRangeTimeControl } from '../controls/daterange.control';
import { DateControl } from '../controls/date.control';
import { TimeControl } from '../controls/time.control';
import { FilesControl } from '../controls/files.control';
import { RadioListControl } from '../controls/radio-list.control';
import { CheckboxListControl } from '../controls/checkbox-list.control';

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
        type: descriptor.type,
        name: descriptor.name,
        label: descriptor.title,
        value: descriptor.value,
        order: descriptor.order
      };

      switch (descriptor.type) {
        case 'text':
        case 'number':
        case 'tel':
          return new TextboxControl(options);
        case 'email':
          return new EmailControl(options);
        case 'checkbox':
          return new CheckboxControl(options);
        case 'textarea':
          return new TextareaControl(options);
        case 'select':
          return new SelectControl(options);
        case 'range':
          return new RangeControl(options);
        case 'currency':
          return new CurrencyControl(options);
        case 'address':
          return new AddressControl(options);
        case 'date':
          return new DateControl(options);
        case 'time':
          return new TimeControl(options);
        case 'datetime':
          return new DateTimeControl(options);
        case 'daterange':
          return new DateRangeTimeControl(options);
        case 'files':
          return new FilesControl(options);
        case 'photos':
          return new PhotosControl(options);
        case 'templeTimings':
          return new TempleTimingsControl(options);
        case 'radiolist':
          return new RadioListControl(options);
        case 'checkboxlist':
          return new CheckboxListControl(options);
        default:
          console.error(`${descriptor.type} is not supported`);
      }
    });

    return controls.filter(x => !!x).sort((a, b) => a.order - b.order);
  }
}
