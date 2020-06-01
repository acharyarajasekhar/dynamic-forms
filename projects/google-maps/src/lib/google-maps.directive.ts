import { Directive, OnInit, HostListener, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GoogleMapsComponent } from './google-maps.component';
import { ToastService } from '@acharyarajasekhar/ngx-utility-services';

@Directive({
    selector: '[gMaps]'
})
export class GoogleMapsDirective implements OnInit {

    @Input('gMaps') address: any;

    constructor(
        private modalCtrl: ModalController,
        private toast: ToastService
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
        else {
            this.toast.show("Geolocation is not set...")
        }
    }
}