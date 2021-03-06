import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import * as _ from 'lodash';

@Component({
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.css']
})
export class CheckboxListComponent implements OnInit {

  control: any;
  list: Array<any> = [];
  values: Array<string> = [];
  isAllSelected: boolean = false;

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.list = [];
    _.forEach(this.control.options, o => {
      this.list.push({
        val: o,
        isChecked: this.values.includes(o.value)
      });
    });
  }

  selectAll() {
    _.forEach(this.list, (l: any) => {
      l.isChecked = true
    });
  }

  clearAll() {
    _.forEach(this.list, (l: any) => {
      l.isChecked = false
    });
  }

  changeValue(event, entry) {
    if (!!event && !!event.detail && !!event.detail.value) {
      _.filter(this.list, { val: entry.val })[0].isChecked = event.detail.checked;
    }
  }

  cancel() {
    this.popoverController.dismiss(null, 'cancel');
  }

  ok() {
    let temp = _.filter(this.list, { isChecked: true });
    temp = _.map(temp, 'val.value');
    this.popoverController.dismiss(temp, 'ok');
  }

}
