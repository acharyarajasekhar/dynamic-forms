import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SampleFormComponent } from './sample-form/sample-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() { }

  async openForm() {
    const modal = await this.modalController.create({
      component: SampleFormComponent,
    });

    modal.onDidDismiss().then(result => {
      if (result.role === 'ok') {
        console.log(result.data);
      }
    })

    return await modal.present();
  }

}
