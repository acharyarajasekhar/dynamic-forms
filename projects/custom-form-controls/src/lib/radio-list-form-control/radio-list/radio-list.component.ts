import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  templateUrl: './radio-list.component.html',
  styleUrls: ['./radio-list.component.css']
})
export class RadioListComponent implements OnInit {

  control: any;
  value: string;

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }

  changeValue(event) {
    if (!!event && !!event.detail && !!event.detail.value) {
      this.value = event.detail.value;
    }
  }

  clear() {
    this.value = null;
  }

  cancel() {
    this.popoverController.dismiss(null, 'cancel');
  }

  ok() {
    this.popoverController.dismiss(this.value, 'ok');
  }

}
