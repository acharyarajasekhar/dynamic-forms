import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { BaseControlComponent } from '../base-control.component';
import { ModalController } from '@ionic/angular';
import { EditTempleTimingsComponent } from '../edit-temple-timings/edit-temple-timings.component';
import { Toastr } from 'src/app/platform/toastr.service';

@Component({
  selector: 'temple-timings-control',
  templateUrl: './temple-timings-control.component.html',
  styleUrls: ['./temple-timings-control.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TempleTimingsControlComponent),
    multi: true
  }]
})
export class TempleTimingsControlComponent extends BaseControlComponent {

  weekdays = moment.weekdaysShort();
  weekdaysFull = moment.weekdays();

  constructor(
    private modalCtrl: ModalController,
    private toastr: Toastr
  ) {
    super();
  }

  getAmPm(timeString: string): string {
    if (!!timeString) return moment(timeString, "HH:mm").format('hh:mm a');
    return null;
  }

  async edit() {
    const modal = await this.modalCtrl.create({
      component: EditTempleTimingsComponent,
      componentProps: {
        input: this.value
      }
    });
    modal.onDidDismiss().then(resp => {
      console.log(resp);
      if (!!resp.data) {
        this.value = resp.data;
        this.onChange(this.value);
      }
    }).catch(err => this.toastr.error(err));
    await modal.present();
  }

}
