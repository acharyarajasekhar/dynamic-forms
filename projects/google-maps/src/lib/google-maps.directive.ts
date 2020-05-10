import { Directive, OnInit, HostListener, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GoogleMapsComponent } from './google-maps.component';

@Directive({
    selector: '[gMaps]'
})
export class GoogleMapsDirective implements OnInit {

    @Input('gMaps') address: any;

    constructor(
        private modalCtrl: ModalController
    ) { }

    ngOnInit() { }

    @HostListener('click', ['$event'])
    async clickEvent(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!!this.address && !!this.address.lat && !!this.address.lng) {
            const modal = await this.modalCtrl.create({
                component: GoogleMapsComponent,
                componentProps: {
                    lat: this.address.lat,
                    lng: this.address.lng,
                    title: this.address.title,
                    message: this.address.display
                }
            });
            await modal.present();
        }
    }
}