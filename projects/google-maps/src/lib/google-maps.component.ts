import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Plugins } from '@capacitor/core';
import { ToastService } from '@acharyarajasekhar/ngx-utility-services';

const { Geolocation } = Plugins;

declare var google;

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  @ViewChild('map', { static: false }) mapElement: any;
  private map: any;
  private marker: any;
  private latLong: any;

  @Input() readonly: boolean = true;
  @Input() lat: number = 16.5745306;
  @Input() lng: number = 80.4361789;
  @Input() title: string;
  @Input() message: string;

  private mapOptions = {
    center: this.latLong,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    }
  };

  constructor(
    private modalCtrl: ModalController,
    private toast: ToastService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      if (!this.lat || !this.lng) this.locateMe();
      else this.initMap();
    });
  }

  initMap() {

    this.latLong = new google.maps.LatLng(this.lat, this.lng);

    this.mapOptions.center = new google.maps.LatLng(this.lat, this.lng);
    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);

    let infoWindowContent = `<strong>GEO Location</strong>`;

    // if (!this.title) infoWindowContent = `<strong>GEO Location</strong>`;

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    this.marker = new google.maps.Marker({
      draggable: !this.readonly,
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(this.lat, this.lng),
      // icon: "assets/imgs/icons/pin.svg"
    });

    google.maps.event.addListener(this.marker, 'click', () => {
      infoWindow.open(this.map, this.marker);
    });

    google.maps.event.addListener(this.map, 'click', (event) => {
      if (!this.readonly) {
        this.lat = event.latLng.lat();
        this.lng = event.latLng.lng();
        this.setCenter();
      }
    });

    google.maps.event.addListener(this.marker, 'dragend', () => {
      this.lat = this.marker.position.lat();
      this.lng = this.marker.position.lng();
    });

    infoWindow.open(this.map, this.marker);
  }

  locateMe() {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    Geolocation.getCurrentPosition(options).then(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.initMap();
    }).catch(err => {
      this.toast.error("Unable to get your current location. Please make sure you enabled 'location' settings on your device...");
      this.initMap();
    });

  }

  setCenter() {
    if (this.lat && this.lng) {
      this.latLong = new google.maps.LatLng(this.lat, this.lng);
      this.map.panTo(new google.maps.LatLng(this.lat, this.lng))
      this.marker.setPosition(this.latLong);
    }
  }

  openNavigator() {
    if (this.lat && this.lng) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${this.lat},${this.lng}`, '_blank');
    }
  }

  goBack() {
    this.modalCtrl.dismiss();
  }

  submit() {
    this.modalCtrl.dismiss({
      lat: this.lat.toString(),
      lng: this.lng.toString()
    })
  }

}
