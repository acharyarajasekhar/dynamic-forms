import { Component, Input, forwardRef, Inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IImagePickerService, IMAGE_PICKER_SERVICE } from '../../services/native-image-picker.service';
import { Toastr } from 'src/app/platform/toastr.service';

@Component({
    selector: 'photos-control',
    templateUrl: 'photos-control.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PhotosControlComponent),
        multi: true
    }],
    styleUrls: ['photos-control.component.scss']
})
export class PhotosControlComponent implements ControlValueAccessor {

    @Input() title: string;
    @Input() defaultPhoto: string;
    @Input() max: number = 3;
    private _photos: Array<string> = [];

    get photos() { return this._photos; }
    set photos(value) { this._photos = value; this.onChange(this.photos); }

    get counter() { return new Array(this.max); }
    get canClear() { return this.photos && this.photos.length > 0; }

    onChange = (_: any) => { };

    constructor(
        private toastr: Toastr,
        @Inject(IMAGE_PICKER_SERVICE) private imgPickerSvc: IImagePickerService
    ) { }

    openImagePicker() {
        this.imgPickerSvc.pick(this.max).then(results => {
            if (results && results.length > 0) {
                this.photos = results;
            }
        }).catch(err => { this.toastr.error(err); });
    }

    clearImages() {
        this.photos = [];
    }

    getPhoto(index) {
        if (this.photos && this.photos.length > index) {
            if (this.photos[index]) {
                return this.photos[index];
            }
        }
        return this.defaultPhoto || "assets/imgs/defaults/1.png";
    }

    // Allow Angular to set the value on the component
    writeValue(value: any): void { if (value != undefined) this.photos = value; }

    // Save a reference to the change function passed to us by
    // the Angular form control
    registerOnChange(fn: any): void { this.onChange = fn; }

    // Save a reference to the touched function passed to us by
    // the Angular form control
    registerOnTouched(): void { }

    // Allow the Angular form control to disable this input
    setDisabledState?(disabled: boolean): void { }

}
