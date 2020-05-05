import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlComponent } from '../base-control.component';

@Component({
  selector: 'select-control',
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectControlComponent),
    multi: true
  }]
})
export class SelectControlComponent extends BaseControlComponent {

  @Input() icon: string;
  @Input() placeholder: string;
  @Input() options: Array<string> = [];
  @Input() selectAll: boolean = false;

}
