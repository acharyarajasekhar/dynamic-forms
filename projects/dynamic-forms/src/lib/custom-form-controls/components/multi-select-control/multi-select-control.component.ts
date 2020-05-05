import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlComponent } from '../base-control.component';

@Component({
  selector: 'multi-select-control',
  templateUrl: './multi-select-control.component.html',
  styleUrls: ['./multi-select-control.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelectControlComponent),
    multi: true
  }]
})
export class MultiSelectControlComponent extends BaseControlComponent {

  @Input() icon: string;
  @Input() placeholder: string;
  @Input() options: Array<string> = [];
  @Input() selectAll: boolean = false;

}
