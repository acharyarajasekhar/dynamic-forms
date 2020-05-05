import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'edit-temple-timings',
  templateUrl: './edit-temple-timings.component.html',
  styleUrls: ['./edit-temple-timings.component.css']
})
export class EditTempleTimingsComponent implements OnInit {

  @Input() input: any = {}
  data: any = {};

  sameForAllDays: boolean;

  onFlagChange(event: { detail: { checked: boolean; }; }) {
    if (event && event.detail) {
      this.sameForAllDays = (event.detail.checked);
      if (this.sameForAllDays) this.applyToAll();
    }
  }

  private applyToAll() {
    for (let w of this.weekdays) {
      if (w === 'Sun') continue;
      this.data[w + '_Morning_Open'] = this.data['Sun_Morning_Open'];
      this.data[w + '_Morning_Close'] = this.data['Sun_Morning_Close'];
      this.data[w + '_Evening_Open'] = this.data['Sun_Evening_Open'];
      this.data[w + '_Evening_Close'] = this.data['Sun_Evening_Close'];
    }
  }

  onTimeChange(event: { detail: { value: any; }; }, field: string) {
    if (event && event.detail && event.detail.value && field) {
      this.data[field] = event.detail.value;
      if (this.sameForAllDays) this.applyToAll();
    }
  }

  weekdays = moment.weekdaysShort();
  weekdaysFull = moment.weekdays();

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    for (let w of this.weekdays) {
      let temp_m_o = null;
      let temp_m_c = null;
      let temp_e_o = null;
      let temp_e_c = null;
      if (!!this.input) {
        this.sameForAllDays = this.input.sameForAllDays;
        if (!!this.input[w]) {
          if (!!this.input[w].Morning) {
            temp_m_o = this.input[w].Morning.Open;
            temp_m_c = this.input[w].Morning.Close;
          }
          if (!!this.input[w].Evening) {
            temp_e_o = this.input[w].Evening.Open;
            temp_e_c = this.input[w].Evening.Close;
          }
        }
      }
      this.data[w + '_Morning_Open'] = temp_m_o;
      this.data[w + '_Morning_Close'] = temp_m_c;
      this.data[w + '_Evening_Open'] = temp_e_o;
      this.data[w + '_Evening_Close'] = temp_e_c;
    }
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  ok() {
    if (!!this.data) {
      let temp = { sameForAllDays: this.sameForAllDays };
      for (let w of this.weekdays) {
        temp[w] = {
          "Morning": { "Open": this.data[w + "_Morning_Open"], "Close": this.data[w + "_Morning_Close"] },
          "Evening": { "Open": this.data[w + "_Evening_Open"], "Close": this.data[w + "_Evening_Close"] }
        }
      }
      this.modalCtrl.dismiss(temp);
    }
    else { console.log('ERROR: ' + this.data) };
  }

}
