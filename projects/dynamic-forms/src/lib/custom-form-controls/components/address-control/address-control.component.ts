import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PostalAddressApiService } from '../../services/postal-address-api.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { GoogleMapsComponent } from 'src/app/platform/google-maps/google-maps.component';
import { Toastr } from 'src/app/platform/toastr.service';

@Component({
  selector: 'address-control',
  templateUrl: 'address-control.component.html',
  styleUrls: ['./address-control.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AddressControlComponent),
    multi: true
  }]
})
export class AddressControlComponent implements ControlValueAccessor {

  line: string;
  postalCode: string;
  postal: any = {};
  lat: string;
  lng: string;
  @Input() controlSeparator: boolean;

  get latlng() {
    if (!!this.lat && !!this.lng) return this.lat.toString().substring(0, 7) + ".., " + this.lng.toString().substring(0, 7) + "..";
    return null;
  }

  get Line1() {
    return this.line;
  }

  set Line1(value) {
    this.line = value;
    this.onAddressChange();
  }

  private onChange: Function = (value: any) => { };

  constructor(
    private postalAddressApi: PostalAddressApiService,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private toastr: Toastr
  ) { }

  CheckPinCode(pinCode) {
    if (pinCode) {
      this.postalAddressApi.getDetailsByPINCode(pinCode).then(async list => {
        let buttons = [];
        for (let office of list) {
          let button = {
            text: office.officename,
            handler: () => {
              this.postal = office;
              this.onAddressChange();
              return true;
            }
          }
          buttons.push(button);
        }

        let actionSheet = await this.actionSheetCtrl.create({
          header: 'Choose your post office',
          buttons: buttons
        });

        await actionSheet.present();
      });
    }
  }

  async openMaps() {
    const modal = await this.modalCtrl.create({
      component: GoogleMapsComponent,
      componentProps: {
        lat: this.lat,
        lng: this.lng,
        readonly: false,
        title: this.postal.title,
        message: this.postal._display
      }
    });
    modal.onDidDismiss().then(resp => {
      if (!!resp.data) {
        this.lat = resp.data.lat;
        this.lng = resp.data.lng;
        this.onAddressChange();
      }
    }).catch(err => this.toastr.error(err));
    await modal.present();
  }

  onAddressChange() {
    this.onChange({
      ...this.postal,
      line: this.line,
      _display: this.line + ', ' + this.postalAddressApi.getPostalDetailsForPlainDisplay(this.postal),
      lat: this.lat || null,
      lng: this.lng || null
    });
  }

  // Allow Angular to set the value on the component
  writeValue(value: any): void {
    if (value != undefined) {
      this.line = value.line;
      this.postal = value;
      this.postalCode = value.pincode;
      this.lat = value.lat || null;
      this.lng = value.lng || null;
    }
  }

  // Save a reference to the change function passed to us by
  // the Angular form control
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Save a reference to the touched function passed to us by
  // the Angular form control
  registerOnTouched(): void { }

  // Allow the Angular form control to disable this input
  setDisabledState?(): void { }

}
